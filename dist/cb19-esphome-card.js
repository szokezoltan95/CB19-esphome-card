/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, V = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), J = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (i) => new ct(typeof i == "string" ? i : i + "", void 0, F), mt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[r + 1], i[0]);
  return new ct(e, i, F);
}, vt = (i, t) => {
  if (V) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = B.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, Y = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: bt, getOwnPropertyDescriptor: wt, getOwnPropertyNames: At, getOwnPropertySymbols: xt, getPrototypeOf: St } = Object, v = globalThis, Q = v.trustedTypes, Et = Q ? Q.emptyScript : "", Ct = v.reactiveElementPolyfillSupport, O = (i, t) => i, j = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Et : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, X = (i, t) => !yt(i, t), tt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && bt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: r } = wt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const l = o?.call(this);
      r?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, s = [...At(e), ...xt(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(Y(o));
    } else t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : j;
      this._$Em = o;
      const l = n.fromAttribute(e, r.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (r = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? X)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: r }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: n } = r, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[O("elementProperties")] = /* @__PURE__ */ new Map(), E[O("finalized")] = /* @__PURE__ */ new Map(), Ct?.({ ReactiveElement: E }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, et = (i) => i, D = M.trustedTypes, it = D ? D.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ht = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + m, Pt = `<${dt}>`, A = document, T = () => A.createComment(""), N = (i) => i === null || typeof i != "object" && typeof i != "function", K = Array.isArray, Ot = (i) => K(i) || typeof i?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, ot = />/g, y = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, nt = /"/g, pt = /^(?:script|style|textarea|title)$/i, Mt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Mt(1), x = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function ut(i, t) {
  if (!K(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const kt = (i, t) => {
  const e = i.length - 1, s = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let h, p, c = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, p = n.exec(a), p !== null); ) g = n.lastIndex, n === P ? p[1] === "!--" ? n = st : p[1] !== void 0 ? n = ot : p[2] !== void 0 ? (pt.test(p[2]) && (o = RegExp("</" + p[2], "g")), n = y) : p[3] !== void 0 && (n = y) : n === y ? p[0] === ">" ? (n = o ?? P, c = -1) : p[1] === void 0 ? c = -2 : (c = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? y : p[3] === '"' ? nt : rt) : n === nt || n === rt ? n = y : n === st || n === ot ? n = P : (n = y, o = void 0);
    const f = n === y && i[l + 1].startsWith("/>") ? " " : "";
    r += n === P ? a + Pt : c >= 0 ? (s.push(h), a.slice(0, c) + ht + a.slice(c) + m + f) : a + m + (c === -2 ? l : f);
  }
  return [ut(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, p] = kt(t, e);
    if (this.el = R.createElement(h, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = w.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(ht)) {
          const g = p[n++], f = o.getAttribute(c).split(m), S = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: r, name: S[2], strings: f, ctor: S[1] === "." ? Tt : S[1] === "?" ? Nt : S[1] === "@" ? Rt : L }), o.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: r }), o.removeAttribute(c));
        if (pt.test(o.tagName)) {
          const c = o.textContent.split(m), g = c.length - 1;
          if (g > 0) {
            o.textContent = D ? D.emptyScript : "";
            for (let f = 0; f < g; f++) o.append(c[f], T()), w.nextNode(), a.push({ type: 2, index: ++r });
            o.append(c[g], T());
          }
        }
      } else if (o.nodeType === 8) if (o.data === dt) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += m.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(i, t, e = i, s) {
  if (t === x) return t;
  let o = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = C(i, o._$AS(i, t.values), o, s)), t;
}
class Ut {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, o = (t?.creationScope ?? A).importNode(e, !0);
    w.currentNode = o;
    let r = w.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new z(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Ht(r, this, t)), this._$AV.push(h), a = s[++l];
      }
      n !== a?.index && (r = w.nextNode(), n++);
    }
    return w.currentNode = A, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), N(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new Ut(o, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const r of t) o === e.length ? e.push(s = new z(this.O(T()), this.O(T()), this, this.options)) : s = e[o], s._$AI(r), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = et(t).nextSibling;
      et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = C(this, t, e, 0), n = !N(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = C(this, l[s + a], e, a), h === x && (h = this._$AH[a]), n || (n = !N(h) || h !== this._$AH[a]), h === d ? t = d : t !== d && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Nt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Rt extends L {
  constructor(t, e, s, o, r) {
    super(t, e, s, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === x) return;
    const s = this._$AH, o = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const zt = M.litHtmlPolyfillSupport;
zt?.(R, z), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const Bt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = o = new z(t.insertBefore(T(), r), r, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
let U = class extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
};
U._$litElement$ = !0, U.finalized = !0, k.litElementHydrateSupport?.({ LitElement: U });
const jt = k.litElementPolyfillSupport;
jt?.({ LitElement: U });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: X }, It = (i = Lt, t, e) => {
  const { kind: s, metadata: o } = e;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function gt(i) {
  return (t, e) => typeof e == "object" ? It(i, t, e) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Wt(i) {
  return gt({ ...i, state: !0, attribute: !1 });
}
const Gt = mt`
  :host {
    display: block;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ha-card {
    display: block;
    overflow: hidden;
    border-radius: 16px;
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 20px;
  }

  .settings-btn {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.12s ease, color 0.12s ease;
  }

  .settings-btn:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .settings-btn ha-icon {
    width: 18px;
    height: 18px;
  }

  .wrapper {
    display: grid;
    grid-template-rows: auto auto auto auto auto;
    gap: 8px;
    padding: 10px 12px 10px;
    width: 100%;
  }

  .flags-row {
    min-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .flag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 600;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .flag.warn {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent);
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(in srgb, var(--error-color) 18%, transparent);
    color: var(--error-color);
  }

  .visual-box {
    width: 100%;
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .gate-svg-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gate-svg {
    display: block;
    width: 100%;
    max-width: none;
    height: auto;
    max-height: 120px;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 20px;
    font-size: 0.82rem;
    line-height: 1;
  }

  .meta-state {
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .meta-separator {
    color: var(--secondary-text-color);
  }

  .meta-position {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .icon-btn {
    appearance: none;
    border: none;
    border-radius: 12px;
    min-height: 40px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.12s ease, background 0.12s ease;
  }

  .icon-btn:hover {
    transform: translateY(-1px);
  }

  .icon-btn:active {
    transform: translateY(0);
  }

  .icon-btn.primary {
    background: color-mix(in srgb, var(--primary-color) 16%, var(--card-background-color));
    color: var(--primary-color);
  }

  .icon-btn.warn {
    background: color-mix(in srgb, var(--error-color) 16%, var(--card-background-color));
    color: var(--error-color);
  }

  ha-icon {
    width: 20px;
    height: 20px;
  }

  .debug-box {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 0.78rem;
    line-height: 1.45;
    word-break: break-word;
    margin-top: 2px;
  }
  
  .gate-svg #left-wing-group,
  .gate-svg #right-wing-group {
    transform-box: fill-box;
    transform-origin: center;
  }
`;
function qt(i) {
  const t = i.controller, e = i.entities ?? {};
  return {
    gatePosition: e.gate_position ?? `sensor.${t}_gate_position`,
    motor1Position: e.motor1_position ?? `sensor.${t}_motor1_position`,
    motor2Position: e.motor2_position ?? `sensor.${t}_motor2_position`,
    gateState: e.gate_state ?? `sensor.${t}_gate_state`,
    lastAck: e.last_ack ?? `sensor.${t}_last_ack`,
    moving: e.moving ?? `binary_sensor.${t}_moving`,
    fullyOpened: e.fully_opened ?? `binary_sensor.${t}_fully_opened`,
    fullyClosed: e.fully_closed ?? `binary_sensor.${t}_fully_closed`,
    pedOpened: e.ped_opened ?? `binary_sensor.${t}_ped_opened`,
    manualStop: e.manual_stop ?? `binary_sensor.${t}_manual_stop`,
    photocell: e.photocell ?? `binary_sensor.${t}_photocell`,
    obstruction: e.obstruction ?? `binary_sensor.${t}_obstruction`,
    pedestrianMode: e.pedestrian_mode ?? `select.${t}_fc_pedestrian_mode`,
    openButton: e.open_button ?? `button.${t}_open`,
    closeButton: e.close_button ?? `button.${t}_close`,
    stopButton: e.stop_button ?? `button.${t}_stop`,
    pedestrianButton: e.pedestrian_button ?? `button.${t}_pedestrian_open`
  };
}
function b(i) {
  return i === "on";
}
function _(i, t) {
  return i?.states?.[t]?.state ?? "";
}
function G(i, t) {
  const e = i?.states?.[t]?.state;
  if (e == null || e === "" || e === "unknown" || e === "unavailable")
    return null;
  const s = Number(e);
  return Number.isFinite(s) ? s : null;
}
function Vt(i) {
  switch (i.trim().toLowerCase()) {
    case "opening":
      return "Opening";
    case "closing":
      return "Closing";
    case "pedopening":
      return "Ped Opening";
    default:
      return "Moving";
  }
}
function Ft(i) {
  return i.trim().toLowerCase().includes("enabled");
}
function Xt(i, t) {
  const e = _(i, t.gateState), s = _(i, t.lastAck), o = b(_(i, t.moving)), r = b(_(i, t.fullyOpened)), n = b(_(i, t.fullyClosed)), l = b(_(i, t.pedOpened)), a = b(_(i, t.manualStop)), h = b(_(i, t.photocell)), p = b(_(i, t.obstruction)), c = _(i, t.pedestrianMode), g = Ft(c), f = G(i, t.gatePosition), S = G(i, t.motor1Position), _t = G(i, t.motor2Position);
  let $ = "Unknown";
  return p ? $ = "Obstructed" : a ? $ = "Stopped" : n ? $ = "Closed" : r ? $ = "Open" : l ? $ = "Ped Open" : o ? $ = Vt(e) : e && ($ = e), {
    position: f,
    motor1Position: S,
    motor2Position: _t,
    rawState: e,
    label: $,
    moving: o,
    fullyOpened: r,
    fullyClosed: n,
    pedOpened: l,
    manualStop: a,
    photocell: h,
    obstruction: p,
    pedestrianEnabled: g,
    lastAck: s
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = { CHILD: 2 }, Zt = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Jt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class q extends Jt {
  constructor(t) {
    if (super(t), this.it = d, t.type !== Kt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null) return this._t = void 0, this.it = t;
    if (t === x) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
q.directiveName = "unsafeHTML", q.resultType = 1;
const Yt = Zt(q), Qt = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20517.43 6772.07"
  class="gate-svg"
  aria-hidden="true"
>
  <defs>
    <style>
      .str0 { stroke:#2B2A29; stroke-width:99.32; stroke-miterlimit:22.9256; }
      .str1 { stroke:#2B2A29; stroke-width:148.99; stroke-miterlimit:22.9256; }
      .str2 { stroke:#2B2A29; stroke-width:7.57; stroke-miterlimit:22.9256; }

      .fil0 { fill:#9D9E9E; }
      .fil1 { fill:#C5C6C6; }
      .fil2 { fill:#B2B3B3; }
      .fil3 { fill:#2B2A29; }
    </style>
  </defs>

  <g id="gate-root">
    <g id="left-post-group">
      <rect id="left-post-body"
            class="fil1 str1"
            x="421"
            y="466.29"
            width="1623.1"
            height="6231.29"/>
      <rect id="left-post-cap"
            class="fil2 str1"
            x="74.49"
            y="74.49"
            width="2316.12"
            height="391.8"
            rx="99.32"
            ry="67.09"/>
    </g>

    <g id="right-post-group">
      <rect id="right-post-body"
            class="fil1 str1"
            x="18473.32"
            y="466.29"
            width="1623.1"
            height="6231.29"/>
      <rect id="right-post-cap"
            class="fil2 str1"
            x="18126.81"
            y="74.49"
            width="2316.12"
            height="391.8"
            rx="99.32"
            ry="67.09"/>
    </g>

    <g id="left-hinges-group">
      <rect id="left-hinge-top"
            class="fil3 str2"
            x="2012.77"
            y="1560.41"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
      <rect id="left-hinge-bottom"
            class="fil3 str2"
            x="2012.77"
            y="5982.87"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
    </g>

    <g id="right-hinges-group">
      <rect id="right-hinge-top"
            class="fil3 str2"
            x="18025.94"
            y="1560.41"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
      <rect id="right-hinge-bottom"
            class="fil3 str2"
            x="18025.94"
            y="5982.87"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
    </g>

    <g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42">
      <path id="left-wing"
            class="fil0 str0"
            d="M2291.97 6394.06l7908.31 0 0 -6158.64c-1504.09,11.92 -2611.12,191.81 -4376.13,633.47 -1765.02,441.65 -3532.17,499.72 -3532.17,499.72l0 5025.46zm729.68 -4521.93l6416.05 0c59.47,0 108.13,32.88 108.13,73.05l0 199.92c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.92c0,-40.18 48.66,-73.05 108.13,-73.05zm0 2807.1l6416.05 0c59.47,0 108.13,32.88 108.13,73.04l0 199.93c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.93c0,-40.17 48.66,-73.04 108.13,-73.04zm0 -935.7l6416.05 0c59.47,0 108.13,32.87 108.13,73.04l0 199.92c0,40.18 -48.66,73.05 -108.13,73.05l-6416.05 0c-59.47,0 -108.13,-32.88 -108.13,-73.05l0 -199.92c0,-40.18 48.66,-73.04 108.13,-73.04zm0 -935.71l6416.05 0c59.47,0 108.13,32.88 108.13,73.05l0 199.92c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.92c0,-40.18 48.66,-73.05 108.13,-73.05zm0 2807.11l6416.05 0c59.47,0 108.13,32.87 108.13,73.04l0 199.92c0,40.18 -48.66,73.05 -108.13,73.05l-6416.05 0c-59.47,0 -108.13,-32.88 -108.13,-73.05l0 -199.92c0,-40.18 48.66,-73.04 108.13,-73.04z"/>
    </g>

    <g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42">
      <path id="right-wing"
            class="fil0 str0"
            d="M18225.46 6394.06l-7908.31 0 0 -6158.64c1504.09,11.92 2611.12,191.81 4376.13,633.47 1765.02,441.65 3532.17,499.72 3532.17,499.72l0 5025.46zm-729.68 -4521.93l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.05l0 199.92c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.92c0,-40.18 -48.66,-73.05 -108.13,-73.05zm0 2807.1l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.04l0 199.93c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.93c0,-40.17 -48.66,-73.04 -108.13,-73.04zm0 -935.7l-6416.05 0c-59.47,0 -108.13,32.87 -108.13,73.04l0 199.92c0,40.18 48.66,73.05 108.13,73.05l6416.05 0c59.47,0 108.13,-32.88 108.13,-73.05l0 -199.92c0,-40.18 -48.66,-73.04 -108.13,-73.04zm0 -935.71l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.05l0 199.92c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.92c0,-40.18 -48.66,-73.05 -108.13,-73.05zm0 2807.11l-6416.05 0c-59.47,0 -108.13,32.87 -108.13,73.04l0 199.92c0,40.18 48.66,73.05 108.13,73.05l6416.05 0c59.47,0 108.13,-32.88 108.13,-73.05l0 -199.92c0,-40.18 -48.66,-73.04 -108.13,-73.04z"/>
    </g>
  </g>
</svg>
`;
function I(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function ft(i) {
  return Number(i.toFixed(5)).toString();
}
function lt(i, t) {
  return i !== null ? I(i / 100, 0, 1) : t;
}
function te(i) {
  return i.trim().toLowerCase() === "pedopening";
}
function ee(i) {
  const t = I(i, 0, 1), s = Math.max(0.035, Math.cos(t * Math.PI / 2));
  return [
    "transform-box: fill-box",
    "transform-origin: left center",
    `transform: scaleX(${ft(s)})`
  ].join("; ");
}
function ie(i) {
  const t = I(i, 0, 1), s = Math.max(0.035, Math.cos(t * Math.PI / 2));
  return [
    "transform-box: fill-box",
    "transform-origin: right center",
    `transform: scaleX(${ft(s)})`
  ].join("; ");
}
function se(i, t) {
  const e = i.position !== null ? I(i.position / 100, 0, 1) : i.fullyOpened ? 1 : i.fullyClosed ? 0 : i.pedOpened ? 0.45 : 0, s = lt(i.motor1Position, e), o = lt(i.motor2Position, e), r = i.moving && te(i.rawState), n = i.pedOpened, l = i.pedestrianEnabled && (r || n);
  let a, h;
  l ? t === "left" ? (a = s, h = 0) : (a = 0, h = s) : t === "left" ? (a = s, h = o) : (a = o, h = s);
  const p = ee(a), c = ie(h), g = Qt.replace(
    '<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42">',
    `<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42" style="${p}">`
  ).replace(
    '<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42">',
    `<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42" style="${c}">`
  );
  return u`
    <div class="gate-svg-wrap">
      ${Yt(g)}
    </div>
  `;
}
var oe = Object.defineProperty, re = Object.getOwnPropertyDescriptor, Z = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? re(t, e) : t, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (o = (s ? n(t, e, o) : n(o)) || o);
  return s && o && oe(t, e, o), o;
};
let H = class extends U {
  setConfig(i) {
    if (!i.controller)
      throw new Error("Missing required option: controller");
    const t = i.motor1_side === "right" ? "right" : "left", e = i.settings_action === !1 ? !1 : i.settings_action === "more_info" ? "more_info" : "device_page";
    this._config = {
      title: "Gate",
      show_controls: !0,
      show_status: !0,
      show_debug: !1,
      motor1_side: t,
      settings_action: e,
      ...i
    };
  }
  getCardSize() {
    return this._config?.show_debug ? 5 : 3;
  }
  getGridOptions() {
    const i = this._config?.show_debug ? 5 : 3;
    return {
      rows: i,
      min_rows: i,
      max_rows: i,
      columns: 12
    };
  }
  get _entities() {
    return this._config ? qt(this._config) : null;
  }
  _pressButton(i) {
    !this.hass || !i || this.hass.callService("button", "press", {
      entity_id: i
    });
  }
  _renderFlags(i) {
    const t = [];
    return i.photocell && t.push(u`
        <div class="flag warn">
          <ha-icon icon="mdi:laser"></ha-icon>
          <span>Photocell</span>
        </div>
      `), i.obstruction && t.push(u`
        <div class="flag error">
          <ha-icon icon="mdi:alert-octagon"></ha-icon>
          <span>Obstruction</span>
        </div>
      `), i.manualStop && t.push(u`
        <div class="flag">
          <ha-icon icon="mdi:hand-back-right"></ha-icon>
          <span>Stopped</span>
        </div>
      `), u`
      <div class="flags-row">
        ${t.length ? t : d}
      </div>
    `;
  }
  _renderMeta(i) {
    const t = i.position === null ? "–" : `${i.position.toFixed(0)}%`;
    return u`
      <div class="meta-row">
        <div class="meta-state">${i.label}</div>
        <div class="meta-separator">•</div>
        <div class="meta-position">${t}</div>
      </div>
    `;
  }
  _renderControls(i, t) {
    const e = t.pedestrianEnabled;
    return u`
      <div
        class="controls"
        style=${e ? "grid-template-columns: repeat(4, minmax(0, 1fr));" : "grid-template-columns: repeat(3, minmax(0, 1fr));"}
      >
        <button
          class="icon-btn primary"
          title="Open"
          @click=${() => this._pressButton(i.openButton)}
        >
          <ha-icon icon="mdi:gate-open"></ha-icon>
        </button>

        <button
          class="icon-btn warn"
          title="Stop"
          @click=${() => this._pressButton(i.stopButton)}
        >
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>

        <button
          class="icon-btn primary"
          title="Close"
          @click=${() => this._pressButton(i.closeButton)}
        >
          <ha-icon icon="mdi:gate"></ha-icon>
        </button>

        ${e ? u`
              <button
                class="icon-btn"
                title="Pedestrian Open"
                @click=${() => this._pressButton(i.pedestrianButton)}
              >
                <ha-icon icon="mdi:walk"></ha-icon>
              </button>
            ` : d}
      </div>
    `;
  }
  _openSettings(i) {
    if (!this._config || !this.hass)
      return;
    const t = this._config.settings_action;
    if (t !== !1) {
      if (this._config.settings_path) {
        window.history.pushState(null, "", this._config.settings_path), window.dispatchEvent(new Event("location-changed"));
        return;
      }
      if (t === "more_info") {
        const e = this._config.settings_entity || i.pedestrianMode;
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: !0,
            composed: !0,
            detail: { entityId: e }
          })
        );
        return;
      }
      console.warn(
        "CB19 Gate Card: settings_action is device_page, but no settings_path is configured."
      );
    }
  }
  _renderTopRow(i) {
    return this._config?.settings_action === !1 ? u`<div class="top-row"></div>` : u`
      <div class="top-row">
        <button
          class="settings-btn"
          title="Settings"
          @click=${() => this._openSettings(i)}
        >
          <ha-icon icon="mdi:cog"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderDebug(i, t) {
    return u`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Motor1 side:</strong> ${this._config?.motor1_side}</div>
        <div><strong>Gate state entity:</strong> ${i.gateState}</div>
        <div><strong>Gate position entity:</strong> ${i.gatePosition}</div>
        <div><strong>Motor1 position entity:</strong> ${i.motor1Position}</div>
        <div><strong>Motor2 position entity:</strong> ${i.motor2Position}</div>
        <div><strong>Pedestrian mode entity:</strong> ${i.pedestrianMode}</div>
        <div><strong>Pedestrian enabled:</strong> ${t.pedestrianEnabled ? "yes" : "no"}</div>
        <div><strong>Last ACK:</strong> ${t.lastAck || "-"}</div>
        <div><strong>Raw state:</strong> ${t.rawState || "-"}</div>
      </div>
    `;
  }
  render() {
    if (!this._config)
      return u``;
    const i = this._entities;
    if (!i)
      return u``;
    const t = Xt(this.hass, i);
    return u`
      <ha-card>
        <div class="wrapper">
          ${this._renderTopRow(i)}
          ${this._renderFlags(t)}

          <div class="visual-box">
            ${se(t, this._config?.motor1_side ?? "left")}
          </div>

          ${this._config.show_status ? this._renderMeta(t) : d}
          ${this._config.show_controls ? this._renderControls(i, t) : d}
          ${this._config.show_debug ? this._renderDebug(i, t) : d}
        </div>
      </ha-card>
    `;
  }
};
H.styles = [Gt];
Z([
  gt({ attribute: !1 })
], H.prototype, "hass", 2);
Z([
  Wt()
], H.prototype, "_config", 2);
H = Z([
  Dt("cb19-gate-card")
], H);
export {
  H as Cb19GateCard
};
