/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, I = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), F = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (I && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (i) => new ot(typeof i == "string" ? i : i + "", void 0, q), dt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[r + 1], i[0]);
  return new ot(e, i, q);
}, ut = (i, t) => {
  if (I) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = B.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, K = I ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ht(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: $t, getOwnPropertyDescriptor: _t, getOwnPropertyNames: ft, getOwnPropertySymbols: gt, getPrototypeOf: vt } = Object, g = globalThis, Z = g.trustedTypes, bt = Z ? Z.emptyScript : "", mt = g.reactiveElementPolyfillSupport, C = (i, t) => i, z = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? bt : null;
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
} }, V = (i, t) => !pt(i, t), J = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: V };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && $t(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: r } = _t(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, s = [...ft(e), ...gt(e)];
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
      for (const o of s) e.unshift(K(o));
    } else t !== void 0 && e.push(K(t));
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
    return ut(t, this.constructor.elementStyles), t;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : z;
      this._$Em = o;
      const l = n.fromAttribute(e, r.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (r = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? V)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[C("elementProperties")] = /* @__PURE__ */ new Map(), w[C("finalized")] = /* @__PURE__ */ new Map(), mt?.({ ReactiveElement: w }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, Q = (i) => i, D = P.trustedTypes, X = D ? D.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, rt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, nt = "?" + f, yt = `<${nt}>`, y = document, k = () => y.createComment(""), M = (i) => i === null || typeof i != "object" && typeof i != "function", G = Array.isArray, At = (i) => G(i) || typeof i?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, tt = />/g, v = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, at = /^(?:script|style|textarea|title)$/i, wt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), A = wt(1), S = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), m = y.createTreeWalker(y, 129);
function lt(i, t) {
  if (!G(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const St = (i, t) => {
  const e = i.length - 1, s = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = x;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let h, p, c = -1, d = 0;
    for (; d < a.length && (n.lastIndex = d, p = n.exec(a), p !== null); ) d = n.lastIndex, n === x ? p[1] === "!--" ? n = Y : p[1] !== void 0 ? n = tt : p[2] !== void 0 ? (at.test(p[2]) && (o = RegExp("</" + p[2], "g")), n = v) : p[3] !== void 0 && (n = v) : n === v ? p[0] === ">" ? (n = o ?? x, c = -1) : p[1] === void 0 ? c = -2 : (c = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? v : p[3] === '"' ? st : et) : n === st || n === et ? n = v : n === Y || n === tt ? n = x : (n = v, o = void 0);
    const _ = n === v && i[l + 1].startsWith("/>") ? " " : "";
    r += n === x ? a + yt : c >= 0 ? (s.push(h), a.slice(0, c) + rt + a.slice(c) + f + _) : a + f + (c === -2 ? l : _);
  }
  return [lt(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, p] = St(t, e);
    if (this.el = N.createElement(h, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = m.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(rt)) {
          const d = p[n++], _ = o.getAttribute(c).split(f), R = /([.?@])?(.*)/.exec(d);
          a.push({ type: 1, index: r, name: R[2], strings: _, ctor: R[1] === "." ? xt : R[1] === "?" ? Ct : R[1] === "@" ? Pt : j }), o.removeAttribute(c);
        } else c.startsWith(f) && (a.push({ type: 6, index: r }), o.removeAttribute(c));
        if (at.test(o.tagName)) {
          const c = o.textContent.split(f), d = c.length - 1;
          if (d > 0) {
            o.textContent = D ? D.emptyScript : "";
            for (let _ = 0; _ < d; _++) o.append(c[_], k()), m.nextNode(), a.push({ type: 2, index: ++r });
            o.append(c[d], k());
          }
        }
      } else if (o.nodeType === 8) if (o.data === nt) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(f, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += f.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  if (t === S) return t;
  let o = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = M(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = E(i, o._$AS(i, t.values), o, s)), t;
}
class Et {
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
    const { el: { content: e }, parts: s } = this._$AD, o = (t?.creationScope ?? y).importNode(e, !0);
    m.currentNode = o;
    let r = m.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new T(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Ot(r, this, t)), this._$AV.push(h), a = s[++l];
      }
      n !== a?.index && (r = m.nextNode(), n++);
    }
    return m.currentNode = y, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = E(this, t, e), M(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : At(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new Et(o, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const r of t) o === e.length ? e.push(s = new T(this.O(k()), this.O(k()), this, this.options)) : s = e[o], s._$AI(r), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Q(t).nextSibling;
      Q(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, o) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = E(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = E(this, l[s + a], e, a), h === S && (h = this._$AH[a]), n || (n = !M(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ct extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Pt extends j {
  constructor(t, e, s, o, r) {
    super(t, e, s, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? u) === S) return;
    const s = this._$AH, o = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Ut = P.litHtmlPolyfillSupport;
Ut?.(N, T), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const kt = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = o = new T(t.insertBefore(k(), r), r, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class U extends w {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
}
U._$litElement$ = !0, U.finalized = !0, O.litElementHydrateSupport?.({ LitElement: U });
const Mt = O.litElementPolyfillSupport;
Mt?.({ LitElement: U });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: V }, Tt = (i = Ht, t, e) => {
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
function ct(i) {
  return (t, e) => typeof e == "object" ? Tt(i, t, e) : ((s, o, r) => {
    const n = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Rt(i) {
  return ct({ ...i, state: !0, attribute: !1 });
}
const Bt = dt`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .state-badge {
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--secondary-background-color);
  }

  .visual-box {
    min-height: 180px;
    border-radius: 16px;
    background: var(--secondary-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  .placeholder-gate {
    width: 100%;
    max-width: 420px;
    height: 120px;
    border-radius: 12px;
    border: 2px dashed var(--divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    text-align: center;
    padding: 16px;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .status-item {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 10px 12px;
  }

  .status-label {
    font-size: 0.78rem;
    color: var(--secondary-text-color);
    margin-bottom: 4px;
  }

  .status-value {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  button.control-btn {
    border: none;
    border-radius: 14px;
    padding: 12px 14px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  button.control-btn.secondary {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  button.control-btn.warn {
    background: var(--error-color);
    color: white;
  }

  .debug-box {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 12px;
    font-size: 0.84rem;
    line-height: 1.5;
    word-break: break-word;
  }
`;
function zt(i) {
  const t = i.controller, e = i.entities ?? {};
  return {
    gatePosition: e.gate_position ?? `sensor.${t}_gate_position`,
    gateState: e.gate_state ?? `sensor.${t}_gate_state`,
    lastAck: e.last_ack ?? `sensor.${t}_last_ack`,
    moving: e.moving ?? `binary_sensor.${t}_moving`,
    fullyOpened: e.fully_opened ?? `binary_sensor.${t}_fully_opened`,
    fullyClosed: e.fully_closed ?? `binary_sensor.${t}_fully_closed`,
    pedOpened: e.ped_opened ?? `binary_sensor.${t}_ped_opened`,
    manualStop: e.manual_stop ?? `binary_sensor.${t}_manual_stop`,
    photocell: e.photocell ?? `binary_sensor.${t}_photocell`,
    obstruction: e.obstruction ?? `binary_sensor.${t}_obstruction`,
    openButton: e.open_button ?? `button.${t}_open`,
    closeButton: e.close_button ?? `button.${t}_close`,
    stopButton: e.stop_button ?? `button.${t}_stop`,
    pedestrianButton: e.pedestrian_button ?? `button.${t}_pedestrian_open`
  };
}
function b(i) {
  return i === "on";
}
function $(i, t) {
  return i?.states?.[t]?.state ?? "";
}
function Dt(i, t) {
  const e = i?.states?.[t]?.state;
  if (e == null || e === "" || e === "unknown" || e === "unavailable")
    return null;
  const s = Number(e);
  return Number.isFinite(s) ? s : null;
}
function jt(i, t) {
  const e = $(i, t.gateState), s = $(i, t.lastAck), o = b($(i, t.moving)), r = b($(i, t.fullyOpened)), n = b($(i, t.fullyClosed)), l = b($(i, t.pedOpened)), a = b($(i, t.manualStop)), h = b($(i, t.photocell)), p = b($(i, t.obstruction)), c = Dt(i, t.gatePosition);
  let d = e || "Unknown";
  return p ? d = "Obstruction" : h ? d = "Photocell active" : a ? d = "Stopped" : o ? c !== null ? c >= 100 ? d = "Opening" : c <= 0 ? d = "Closing" : d = "Moving" : d = "Moving" : l ? d = "Pedestrian open" : r ? d = "Open" : n && (d = "Closed"), {
    position: c,
    rawState: e,
    label: d,
    moving: o,
    fullyOpened: r,
    fullyClosed: n,
    pedOpened: l,
    manualStop: a,
    photocell: h,
    obstruction: p,
    lastAck: s
  };
}
var Lt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, W = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? It(t, e) : t, r = i.length - 1, n; r >= 0; r--)
    (n = i[r]) && (o = (s ? n(t, e, o) : n(o)) || o);
  return s && o && Lt(t, e, o), o;
};
let H = class extends U {
  setConfig(i) {
    if (!i.controller)
      throw new Error("Missing required option: controller");
    this._config = {
      title: "Gate",
      show_controls: !0,
      show_status: !0,
      show_debug: !1,
      ...i
    };
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      rows: 4,
      columns: 6,
      min_rows: 4
    };
  }
  get _entities() {
    return this._config ? zt(this._config) : null;
  }
  _pressButton(i) {
    !this.hass || !i || this.hass.callService("button", "press", {
      entity_id: i
    });
  }
  _renderStatus(i) {
    const t = i.position === null ? "Unknown" : `${i.position.toFixed(0)}%`;
    return A`
      <div class="status-grid">
        <div class="status-item">
          <div class="status-label">Position</div>
          <div class="status-value">${t}</div>
        </div>

        <div class="status-item">
          <div class="status-label">State</div>
          <div class="status-value">${i.label}</div>
        </div>

        <div class="status-item">
          <div class="status-label">Photocell</div>
          <div class="status-value">${i.photocell ? "Active" : "Idle"}</div>
        </div>

        <div class="status-item">
          <div class="status-label">Obstruction</div>
          <div class="status-value">${i.obstruction ? "Detected" : "None"}</div>
        </div>
      </div>
    `;
  }
  _renderControls(i) {
    return A`
      <div class="controls">
        <button
          class="control-btn"
          @click=${() => this._pressButton(i.openButton)}
        >
          Open
        </button>

        <button
          class="control-btn secondary"
          @click=${() => this._pressButton(i.pedestrianButton)}
        >
          Pedestrian
        </button>

        <button
          class="control-btn secondary"
          @click=${() => this._pressButton(i.closeButton)}
        >
          Close
        </button>

        <button
          class="control-btn warn"
          @click=${() => this._pressButton(i.stopButton)}
        >
          Stop
        </button>
      </div>
    `;
  }
  _renderDebug(i, t) {
    return A`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Gate state entity:</strong> ${i.gateState}</div>
        <div><strong>Gate position entity:</strong> ${i.gatePosition}</div>
        <div><strong>Last ACK:</strong> ${t.lastAck || "-"}</div>
        <div><strong>Raw state:</strong> ${t.rawState || "-"}</div>
      </div>
    `;
  }
  render() {
    if (!this._config)
      return A``;
    const i = this._entities;
    if (!i)
      return A``;
    const t = jt(this.hass, i), e = this._config.title || "Gate";
    return A`
      <ha-card>
        <div class="wrapper">
          <div class="header-row">
            <div class="title">${e}</div>
            <div class="state-badge">${t.label}</div>
          </div>

          <div class="visual-box">
            <div class="placeholder-gate">
              SVG gate view will go here
            </div>
          </div>

          ${this._config.show_status ? this._renderStatus(t) : u}
          ${this._config.show_controls ? this._renderControls(i) : u}
          ${this._config.show_debug ? this._renderDebug(i, t) : u}
        </div>
      </ha-card>
    `;
  }
};
H.styles = [Bt];
W([
  ct({ attribute: !1 })
], H.prototype, "hass", 2);
W([
  Rt()
], H.prototype, "_config", 2);
H = W([
  Nt("cb19-gate-card")
], H);
export {
  H as Cb19GateCard
};
