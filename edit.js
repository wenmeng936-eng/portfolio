/* edit.js — edit-mode.html logic.
   Defines all editable text fields (id + label + default), renders textareas,
   loads any previously saved values, and saves back to localStorage "wm_edits".
   The viewing page (index.html) reads that same key via apply-edits.js. */

const FIELD_GROUPS = [
  {
    group: "导航",
    fields: [
      { id: "ed-nav-1", label: "导航 · AI 影视作品集", def: "AI 影视作品集" },
      { id: "ed-nav-2", label: "导航 · 影视包装作品集", def: "影视包装作品集" },
      { id: "ed-nav-3", label: "导航 · 联系方式", def: "联系方式" },
    ],
  },
  {
    group: "首屏 Hero",
    fields: [
      { id: "ed-hero-eyebrow", label: "英文小标题", def: "Film & AI Post-Production Portfolio" },
      { id: "ed-hero-title", label: "主标题", def: "以影像为语言，\n用技术书写故事。" },
      { id: "ed-hero-desc", label: "介绍文字", def: "温梦，专注影视 AI 后期制作与影视包装设计。参与腾讯 WorkRally 影视 AI 后期平台的搭建与上线，\n服务腾讯、爱奇艺、优酷等平台 30＋ 项目，累计输出 100＋ 视频作品。" },
      { id: "ed-hero-btn-1", label: "按钮一", def: "查看 AI 影视作品" },
      { id: "ed-hero-btn-2", label: "按钮二", def: "查看影视包装作品" },
    ],
  },
  {
    group: "数据栏",
    fields: [
      { id: "ed-stat-1", label: "数据一标签", def: "影视包装项目" },
      { id: "ed-stat-2", label: "数据二标签", def: "视频产出总量" },
      { id: "ed-stat-3", label: "数据三标签", def: "AI 后期核心能力" },
      { id: "ed-stat-4", label: "数据四标签", def: "合作头部平台" },
    ],
  },
  {
    group: "AI 影视作品集",
    fields: [
      { id: "ed-aifilm-eyebrow", label: "区块小标题", def: "Part 01" },
      { id: "ed-aifilm-title", label: "区块标题", def: "温梦 AI 影视作品集" },
      { id: "ed-aifilm-desc", label: "区块介绍", def: "参与腾讯 WorkRally 影视 AI 后期平台的搭建与上线，完成多部爆款电视剧的 AI 后期制作 ——\n覆盖角色、口型、场景、物品四大维度的智能编辑能力。点击卡片播放对比视频。" },
      { id: "ed-sec-char", label: "分组 · 角色编辑", def: "AI 后期 · 角色编辑" },
      { id: "ed-tag-char", label: "标签 · 人物设定", def: "人物设定" },
      { id: "ed-sec-lip", label: "分组 · 口型修改", def: "AI 后期 · 口型修改" },
      { id: "ed-tag-lip", label: "标签 · Lip Sync", def: "Lip Sync" },
      { id: "ed-sec-scene", label: "分组 · 场景编辑", def: "AI 后期 · 场景编辑" },
      { id: "ed-tag-scene", label: "标签 · Scene FX", def: "Scene FX" },
      { id: "ed-sec-prop", label: "分组 · 物品编辑", def: "AI 后期 · 物品编辑" },
      { id: "ed-tag-prop", label: "标签 · Object Edit", def: "Object Edit" },
      { id: "ed-cap-1", label: "卡片 · 年龄编辑主角年轻化", def: "年龄编辑 · 主角年轻化" },
      { id: "ed-cap-2", label: "卡片 · 年龄编辑老化", def: "年龄编辑 · 老化" },
      { id: "ed-cap-3", label: "卡片 · 换脸", def: "换脸" },
      { id: "ed-cap-4", label: "卡片 · 更改发型", def: "更改发型" },
      { id: "ed-cap-5", label: "卡片 · 装造调整", def: "装造调整" },
      { id: "ed-cap-6", label: "卡片 · 口型对比01", def: "口型修改 · 对比 01" },
      { id: "ed-cap-7", label: "卡片 · 口型对比02", def: "口型修改 · 对比 02" },
      { id: "ed-cap-8", label: "卡片 · 种人集群特效", def: "种人集群特效" },
      { id: "ed-cap-9", label: "卡片 · 局部特效添加", def: "局部特效添加" },
      { id: "ed-cap-10", label: "卡片 · 场景替换", def: "场景替换" },
      { id: "ed-cap-11", label: "卡片 · CG生物特效", def: "CG 生物特效" },
      { id: "ed-cap-12", label: "卡片 · 背景特效", def: "背景特效" },
      { id: "ed-cap-13", label: "卡片 · 场景火焰特效", def: "场景火焰特效" },
      { id: "ed-cap-14", label: "卡片 · 物品消除", def: "物品消除" },
      { id: "ed-cap-15", label: "卡片 · 物品添加", def: "物品添加" },
    ],
  },
  {
    group: "影视包装作品集",
    fields: [
      { id: "ed-pkg-eyebrow", label: "区块小标题", def: "Part 02" },
      { id: "ed-pkg-title", label: "区块标题", def: "温梦影视包装作品集" },
      { id: "ed-pkg-desc", label: "区块介绍", def: "参与腾讯、爱奇艺、优酷、各类电影制作公司的 30＋ 项目，累计输出 100＋ 视频 ——\n涵盖杀青特辑、预告片、MV 动画与花絮制作。" },
      { id: "ed-ftr-1", label: "筛选 · 全部平台", def: "全部平台" },
      { id: "ed-ftr-2", label: "筛选 · 腾讯视频", def: "腾讯视频" },
      { id: "ed-ftr-3", label: "筛选 · 爱奇艺", def: "爱奇艺" },
      { id: "ed-ftr-4", label: "筛选 · 优酷", def: "优酷" },
      { id: "ed-ftr-5", label: "筛选 · CCTV", def: "CCTV" },
      { id: "ed-pkg1-b1", label: "冬至 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg1-b2", label: "冬至 · 标签二", def: "MV 动画" },
      { id: "ed-pkg1-title", label: "冬至 · 标题", def: "《冬至》两支 MV 动画" },
      { id: "ed-pkg2-b1", label: "许我耀眼 · 标签一", def: "腾讯视频" },
      { id: "ed-pkg2-b2", label: "许我耀眼 · 标签二", def: "杀青特辑" },
      { id: "ed-pkg2-title", label: "许我耀眼 · 标题", def: "《许我耀眼》杀青特辑" },
      { id: "ed-pkg3-b1", label: "以美之名 · 标签一", def: "优酷" },
      { id: "ed-pkg3-b2", label: "以美之名 · 标签二", def: "预告片" },
      { id: "ed-pkg3-title", label: "以美之名 · 标题", def: "《以美之名》预告" },
      { id: "ed-pkg4-b1", label: "凡人歌 · 标签一", def: "CCTV" },
      { id: "ed-pkg4-b2", label: "凡人歌 · 标签二", def: "电视剧特辑" },
      { id: "ed-pkg4-title", label: "凡人歌 · 标题", def: "《凡人歌》特辑" },
      { id: "ed-pkg5-b1", label: "生万物 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg5-b2", label: "生万物 · 标签二", def: "杀青特辑" },
      { id: "ed-pkg5-title", label: "生万物 · 标题", def: "《生万物》杀青特辑" },
      { id: "ed-pkg6-b1", label: "足迹 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg6-b2", label: "足迹 · 标签二", def: "杀青特辑" },
      { id: "ed-pkg6-title", label: "足迹 · 标题", def: "《足迹》杀青特辑" },
      { id: "ed-pkg7-b1", label: "柳州记 · 标签一", def: "腾讯视频" },
      { id: "ed-pkg7-b2", label: "柳州记 · 标签二", def: "纪录特辑" },
      { id: "ed-pkg7-title", label: "柳州记 · 标题", def: "《柳州记》特辑" },
      { id: "ed-pkg8-b1", label: "暗河传 · 标签一", def: "优酷" },
      { id: "ed-pkg8-b2", label: "暗河传 · 标签二", def: "古装剧特辑" },
      { id: "ed-pkg8-title", label: "暗河传 · 标题", def: "《暗河传》特辑" },
      { id: "ed-pkg9-b1", label: "蜀锦人家 · 标签一", def: "优酷" },
      { id: "ed-pkg9-b2", label: "蜀锦人家 · 标签二", def: "古装剧特辑" },
      { id: "ed-pkg9-title", label: "蜀锦人家 · 标题", def: "《蜀锦人家》特辑" },
      { id: "ed-pkg10-b1", label: "念无双 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg10-b2", label: "念无双 · 标签二", def: "古装剧特辑" },
      { id: "ed-pkg10-title", label: "念无双 · 标题", def: "《念无双》" },
      { id: "ed-pkg11-b1", label: "仙台有树 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg11-b2", label: "仙台有树 · 标签二", def: "现代剧" },
      { id: "ed-pkg11-title", label: "仙台有树 · 标题", def: "《仙台有树》" },
      { id: "ed-pkg12-b1", label: "风中的火焰 · 标签一", def: "爱奇艺" },
      { id: "ed-pkg12-b2", label: "风中的火焰 · 标签二", def: "花絮" },
      { id: "ed-pkg12-title", label: "风中的火焰 · 标题", def: "《风中的火焰》花絮" },
    ],
  },
  {
    group: "联系 / 页脚",
    fields: [
      { id: "ed-contact-eyebrow", label: "联系小标题", def: "Let's Create" },
      { id: "ed-contact-title", label: "联系标题", def: "用技术与审美，\n继续讲好每一段影像故事。" },
      { id: "ed-contact-desc", label: "联系介绍", def: "如果你正在寻找一位懂 AI 后期、也懂影视包装的合作者，欢迎联系交流合作方向与项目细节。" },
      { id: "ed-contact-btn", label: "返回顶部按钮", def: "返回顶部" },
      { id: "ed-footer-1", label: "页脚版权", def: "© 2026 温梦 · 影视 AI 后期与包装作品集" },
      { id: "ed-footer-2", label: "页脚署名", def: "由 Box AI 通过自然语言生成" },
    ],
  },
];

(function () {
  const root = document.getElementById("edit-root");
  const saved = (function () {
    try { return JSON.parse(localStorage.getItem("wm_edits") || "{}"); }
    catch (e) { return {}; }
  })();

  FIELD_GROUPS.forEach((g) => {
    const wrap = document.createElement("div");
    wrap.className = "edit-group";
    const gl = document.createElement("label");
    gl.textContent = g.group;
    wrap.appendChild(gl);

    g.fields.forEach((f) => {
      const field = document.createElement("div");
      field.className = "edit-field";
      const lbl = document.createElement("span");
      lbl.textContent = f.label;
      const ta = document.createElement("textarea");
      ta.dataset.editId = f.id;
      ta.value = saved[f.id] !== undefined ? saved[f.id] : f.def;
      ta.rows = (ta.value.match(/\n/g) || []).length + 1;
      field.appendChild(lbl);
      field.appendChild(ta);
      wrap.appendChild(field);
    });
    root.appendChild(wrap);
  });

  function collect() {
    const out = {};
    document.querySelectorAll("textarea[data-edit-id]").forEach((ta) => {
      out[ta.dataset.editId] = ta.value;
    });
    return out;
  }

  const toast = document.getElementById("toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  }

  document.getElementById("btn-save").addEventListener("click", () => {
    localStorage.setItem("wm_edits", JSON.stringify(collect()));
    showToast("已保存 ✓");
  });

  document.getElementById("btn-preview").addEventListener("click", () => {
    localStorage.setItem("wm_edits", JSON.stringify(collect()));
    window.open("./index.html", "_blank");
  });
})();
