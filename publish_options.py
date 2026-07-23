"""发布作品可配置参数（对应 create_v2 请求体 + 创作者中心发布页）。"""

from __future__ import annotations

import json
import time
from dataclasses import asdict, dataclass, field, fields
from typing import Any, Optional


@dataclass
class PublishOptions:
    """
    与网页「发布视频」页面对齐的可配置项。

    可见性 visibility_type:
      0 = 公开
      1 = 好友可见
      2 = 仅自己可见

    download:
      1 = 允许他人保存
      0 = 不允许

    timing:
      0 = 立即发布
      >0 = 定时发布时间戳（秒）
    """

    # ----- 基础信息 -----
    title: str = ""
    caption: str = ""  # 作品简介
    hashtags: list[str] = field(default_factory=list)  # 话题，不含 #
    mentions: list[str] = field(default_factory=list)  # @好友 sec_uid / 昵称占位
    activity: list[Any] = field(default_factory=list)  # 官方活动
    hot_sentence: str = ""  # 关联热点词

    # ----- 发布设置 -----
    visibility_type: int = 0  # 谁可以看
    download: int = 1  # 保存权限
    timing: int = 0  # 发布时间

    # ----- 音乐 -----
    music_id: Optional[str] = None
    music_source: int = 0
    music_end_time: Optional[int] = None  # 图文：截取结束时间（毫秒，通常=duration*1000）

    # ----- 封面 -----
    poster_delay: int = 0  # 封面取帧时间（秒，网页侧语义）

    # ----- 合集 -----
    mix_id: str = ""

    # ----- 同步 -----
    should_sync: bool = False
    sync_to_toutiao: int = 0

    # ----- 章节（可选 JSON 结构）-----
    chapter_abstract: str = ""
    chapter_details: list[dict[str, Any]] = field(default_factory=list)
    chapter_type: int = 0

    # ----- 地理位置 / 锚点（透传）-----
    anchor: dict[str, Any] = field(default_factory=dict)

    # ----- 助手 -----
    is_preview: int = 0
    is_post_assistant: int = 1  # 与网页抓包一致

    # ----- 扩展透传（高级，直接合并进 common）-----
    extra_common: dict[str, Any] = field(default_factory=dict)

    def _build_text_and_extras(self) -> tuple[str, list[dict[str, Any]], list[dict[str, Any]], list[Any]]:
        """返回 (text_body, challenges, text_extra_hashtags, mentions_payload)。"""
        title = (self.title or "").strip()
        caption_text = (self.caption or "").strip()

        challenges: list[dict[str, Any]] = []
        text_extra: list[dict[str, Any]] = []
        tag_parts: list[str] = []
        skipped_tags: list[str] = []
        for tag in self.hashtags:
            hid = ""
            if isinstance(tag, dict):
                name = str(tag.get("hashtag_name") or tag.get("name") or "").lstrip("#").strip()
                hid = str(tag.get("hashtag_id") or tag.get("cid") or "")
            else:
                name = str(tag).lstrip("#").strip()
            if not name:
                continue
            if not hid:
                skipped_tags.append(name)
                continue
            token = f"#{name}"
            tag_parts.append(token)
            challenges.append({"hashtag_name": name, "hashtag_id": hid})

        if skipped_tags:
            # 避免污染 text；需要话题时请传 {hashtag_name, hashtag_id}
            print(
                f"[options] skip hashtags without id: {skipped_tags} "
                "(裸 #话题 会触发简介非法)",
                flush=True,
            )

        mentions_payload: list[Any] = []
        for m in self.mentions:
            if isinstance(m, dict):
                mentions_payload.append(m)
            elif m:
                mentions_payload.append({"nickname": str(m)})

        if caption_text and caption_text != title:
            text_body = f"{title} {caption_text}".strip()
        else:
            text_body = title
        if tag_parts:
            text_body = f"{text_body} {' '.join(tag_parts)}".strip()

        cursor = 0
        for ch, token in zip(challenges, tag_parts):
            idx = text_body.find(token, cursor)
            if idx < 0:
                continue
            text_extra.append(
                {
                    "start": idx,
                    "end": idx + len(token),
                    "type": 1,
                    "hashtag_name": ch["hashtag_name"],
                    "hashtag_id": ch["hashtag_id"],
                    "user_id": "",
                }
            )
            cursor = idx + len(token)

        return text_body, challenges, text_extra, mentions_payload

    def to_create_item(
        self,
        video_id: str,
        poster: str,
        creation_id: str,
        cover_width: int = 0,
        cover_height: int = 0,
    ) -> dict[str, Any]:
        """视频 create_v2（2026-07-23 创作者中心浏览器实发抓包对齐）。

        要点:
          - text = 标题 + 空格 + 简介（无强制末尾空格）
          - caption = 简介原文（不是空字符串）
          - 未选配乐时 music_id 必须为 null（勿传无关推荐歌 id）
          - cover 传 poster；自定义封面时带 width/height
        """
        title = (self.title or "").strip()
        caption_text = (self.caption or "").strip()
        # 裸写 #话题 且无 hashtag_id / text_extra 时，create_v2 常返回 49「简介非法」
        text_body, challenges, text_extra, mentions_payload = self._build_text_and_extras()

        common: dict[str, Any] = {
            "text": text_body,
            "caption": caption_text,
            "item_title": title,
            "activity": json.dumps(self.activity, ensure_ascii=False, separators=(",", ":")),
            "text_extra": json.dumps(text_extra, ensure_ascii=False, separators=(",", ":")),
            "challenges": json.dumps(challenges, ensure_ascii=False, separators=(",", ":")),
            "mentions": json.dumps(mentions_payload, ensure_ascii=False, separators=(",", ":")),
            "hashtag_source": "",
            "hot_sentence": self.hot_sentence or "",
            "interaction_stickers": "[]",
            "visibility_type": int(self.visibility_type),
            "download": int(self.download),
            "timing": int(self.timing),
            "creation_id": creation_id,
            "media_type": 4,
            "video_id": video_id,
            "music_source": int(self.music_source),
            # 网页未选配乐时为 null；硬编码无关 music_id 易触发风控
            "music_id": str(self.music_id) if self.music_id else None,
        }
        if self.music_end_time is not None:
            common["music_end_time"] = int(self.music_end_time)
        if self.extra_common:
            common.update(self.extra_common)

        chapter_obj = {
            "chapter_abstract": self.chapter_abstract or "",
            "chapter_details": self.chapter_details or [],
            "chapter_type": int(self.chapter_type),
            "chapter_tools_info": {
                "chapter_recommend_detail": [],
                "chapter_recommend_abstract": "",
                "chapter_source": 2,
                "chapter_recommend_type": -2,
                "create_date": int(time.time()),
                "is_pc": "1",
                "is_pre_generated": "0",
                "is_syn": "1",
            },
        }

        mix: dict[str, Any] = {}
        if self.mix_id:
            mix = {"mix_id": self.mix_id}

        cover: dict[str, Any] = {
            "poster": poster,
            "poster_delay": int(self.poster_delay),
            "cover_tools_extend_info": "{}",
            "cover_tools_info": "{}",
        }
        if cover_width > 0 and cover_height > 0:
            cover["custom_cover_image_width"] = int(cover_width)
            cover["custom_cover_image_height"] = int(cover_height)

        return {
            "item": {
                "common": common,
                "cover": cover,
                "mix": mix,
                "selected_member": {"is_selected_member_video": False},
                "chapter": {
                    "chapter": json.dumps(chapter_obj, ensure_ascii=False, separators=(",", ":"))
                },
                "anchor": self.anchor or {},
                "sync": {
                    "should_sync": bool(self.should_sync),
                    "sync_to_toutiao": int(self.sync_to_toutiao),
                },
                "open_platform": {},
                "assistant": {
                    "is_preview": int(self.is_preview),
                    "is_post_assistant": int(self.is_post_assistant),
                },
            }
        }

    def to_create_image_item(
        self,
        images: list[dict[str, Any]],
        poster: str,
        creation_id: str,
    ) -> dict[str, Any]:
        """图文 create_v2 请求体（2026-07-22 创作者中心抓包）。

        关键点:
          - media_type = 2
          - common.images = [{uri, width, height}, ...]
          - 无 video_id
          - 立即发布 timing = -1（定时仍传 Unix 秒）
          - text 末尾补「。」；text_extra type7=标题段、type8=句号段
        """
        title = (self.title or "").strip()
        text_body, challenges, hash_extras, mentions_payload = self._build_text_and_extras()
        if not text_body.endswith("。"):
            text_body = f"{text_body}。"

        text_extra: list[dict[str, Any]] = [
            {
                "start": 0,
                "end": min(len(title), len(text_body)),
                "hashtag_id": 0,
                "hashtag_name": "",
                "type": 7,
            },
        ]
        if text_body.endswith("。"):
            text_extra.append(
                {
                    "start": len(text_body) - 1,
                    "end": len(text_body),
                    "hashtag_id": 0,
                    "hashtag_name": "",
                    "type": 8,
                }
            )
        # 带 id 的话题继续追加 type=1
        text_extra.extend(hash_extras)

        # 网页立即发布图文用 -1；定时用正时间戳
        timing = int(self.timing)
        if timing == 0:
            timing = -1

        common: dict[str, Any] = {
            "text": text_body,
            "text_extra": json.dumps(text_extra, ensure_ascii=False, separators=(",", ":")),
            "activity": json.dumps(self.activity, ensure_ascii=False, separators=(",", ":")),
            "challenges": json.dumps(challenges, ensure_ascii=False, separators=(",", ":")),
            "hashtag_source": "",
            "mentions": json.dumps(mentions_payload, ensure_ascii=False, separators=(",", ":")),
            "visibility_type": int(self.visibility_type),
            "download": int(self.download),
            "timing": timing,
            "media_type": 2,
            "images": images,
            "creation_id": creation_id,
        }
        if self.hot_sentence:
            common["hot_sentence"] = self.hot_sentence
        # 图文抓包：music_id + music_end_time（毫秒），不传 music_source
        if self.music_id:
            common["music_id"] = str(self.music_id)
            if self.music_end_time is not None:
                common["music_end_time"] = int(self.music_end_time)
        if self.extra_common:
            common.update(self.extra_common)

        item: dict[str, Any] = {
            "common": common,
            "cover": {"poster": poster},
            "anchor": self.anchor or {},
        }
        if self.mix_id:
            item["mix"] = {"mix_id": self.mix_id}
        return {"item": item}

    @classmethod
    def from_mapping(cls, data: Optional[dict[str, Any]]) -> "PublishOptions":
        if not data:
            return cls()
        known = {f.name for f in fields(cls)}
        kwargs: dict[str, Any] = {}
        for k, v in data.items():
            if k in known:
                kwargs[k] = v
        # 兼容别名
        if "desc" in data and "caption" not in kwargs:
            kwargs["caption"] = data["desc"]
        if "description" in data and "caption" not in kwargs:
            kwargs["caption"] = data["description"]
        if "tags" in data and "hashtags" not in kwargs:
            kwargs["hashtags"] = data["tags"]
        if "private" in data and data["private"] and "visibility_type" not in kwargs:
            kwargs["visibility_type"] = 2
        return cls(**kwargs)

    def as_public_dict(self) -> dict[str, Any]:
        return asdict(self)


# 文档用字段说明（原 Flask GET /api/options；接口层已废弃，可随 app.py 去掉）
OPTIONS_SCHEMA: list[dict[str, Any]] = [
    {"name": "title", "type": "string", "default": "", "desc": "作品标题（必填）"},
    {"name": "caption", "type": "string", "default": "", "desc": "作品简介（拼进 text，同时写入 caption 字段）"},
    {"name": "hashtags", "type": "string[]", "default": [], "desc": "话题名列表，拼进 text；带 id 可用 {hashtag_name,hashtag_id}"},
    {"name": "mentions", "type": "string[]|object[]", "default": [], "desc": "@好友"},
    {"name": "activity", "type": "array", "default": [], "desc": "官方活动配置"},
    {"name": "hot_sentence", "type": "string", "default": "", "desc": "关联热点词"},
    {
        "name": "visibility_type",
        "type": "int",
        "default": 0,
        "desc": "谁可以看：0公开 / 1好友可见 / 2仅自己可见",
    },
    {"name": "download", "type": "int", "default": 1, "desc": "保存权限：1允许 / 0不允许"},
    {"name": "timing", "type": "int", "default": 0, "desc": "0立即发布，否则为定时 Unix 秒时间戳"},
    {"name": "music_id", "type": "string|null", "default": None, "desc": "音乐 ID（来自 music/list）"},
    {"name": "music_source", "type": "int", "default": 0, "desc": "音乐来源（视频用；图文抓包未传）"},
    {"name": "music_end_time", "type": "int|null", "default": None, "desc": "图文配乐结束毫秒，通常 duration*1000"},
    {"name": "poster_delay", "type": "int", "default": 0, "desc": "封面相关延时/取帧参数"},
    {"name": "mix_id", "type": "string", "default": "", "desc": "合集 ID"},
    {"name": "should_sync", "type": "bool", "default": False, "desc": "是否同步其他平台"},
    {"name": "sync_to_toutiao", "type": "int", "default": 0, "desc": "是否同步头条"},
    {"name": "chapter_abstract", "type": "string", "default": "", "desc": "章节摘要"},
    {"name": "chapter_details", "type": "array", "default": [], "desc": "章节明细"},
    {"name": "chapter_type", "type": "int", "default": 0, "desc": "章节类型"},
    {"name": "anchor", "type": "object", "default": {}, "desc": "地理位置等锚点透传"},
    {"name": "is_preview", "type": "int", "default": 0, "desc": "是否预览发布"},
    {"name": "is_post_assistant", "type": "int", "default": 0, "desc": "发文助手标记"},
    {"name": "extra_common", "type": "object", "default": {}, "desc": "合并进 common 的高级字段"},
]

# 图文模式补充说明（见 PublishOptions.to_create_image_item）
IMAGE_NOTES = (
    "图文: media_type=2; images=[{uri,width,height}]; "
    "立即发布 timing=-1; 封面默认第一张图 uri"
)
