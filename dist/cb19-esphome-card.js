/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, X = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (i) => new ht(typeof i == "string" ? i : i + "", void 0, K), yt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((o, s, n) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[n + 1], i[0]);
  return new ht(e, i, K);
}, xt = (i, t) => {
  if (X) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), s = j.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = e.cssText, i.appendChild(o);
  }
}, Y = X ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return mt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: At, getOwnPropertyDescriptor: St, getOwnPropertyNames: Et, getOwnPropertySymbols: Ct, getPrototypeOf: Pt } = Object, m = globalThis, tt = m.trustedTypes, Ot = tt ? tt.emptyScript : "", kt = m.reactiveElementPolyfillSupport, M = (i, t) => i, D = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ot : null;
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
} }, Z = (i, t) => !wt(i, t), et = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(t, o, e);
      s !== void 0 && At(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: s, set: n } = St(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const l = s?.call(this);
      n?.call(this, r), this.requestUpdate(t, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, o = [...Et(e), ...Ct(e)];
      for (const s of o) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, s] of e) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const s = this._$Eu(e, o);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const s of o) e.unshift(Y(s));
    } else t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    const o = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, o);
    if (s !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : D).toAttribute(e, o.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, s = o._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = o.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : D;
      this._$Em = s;
      const l = r.fromAttribute(e, n.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, s = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[t]), o ?? (o = r.getPropertyOptions(t)), !((o.hasChanged ?? Z)(n, e) || o.useDefault && o.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: s, wrapped: n }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, n] of o) {
        const { wrapped: r } = n, l = this[s];
        r !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[M("elementProperties")] = /* @__PURE__ */ new Map(), C[M("finalized")] = /* @__PURE__ */ new Map(), kt?.({ ReactiveElement: C }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, it = (i) => i, L = U.trustedTypes, ot = L ? L.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, pt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ut = "?" + $, Mt = `<${ut}>`, A = document, N = () => A.createComment(""), B = (i) => i === null || typeof i != "object" && typeof i != "function", J = Array.isArray, Ut = (i) => J(i) || typeof i?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, nt = />/g, y = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, at = /"/g, _t = /^(?:script|style|textarea|title)$/i, Tt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Tt(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function gt(i, t) {
  if (!J(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const zt = (i, t) => {
  const e = i.length - 1, o = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = k;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let h, _, p = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, _ = r.exec(a), _ !== null); ) g = r.lastIndex, r === k ? _[1] === "!--" ? r = st : _[1] !== void 0 ? r = nt : _[2] !== void 0 ? (_t.test(_[2]) && (s = RegExp("</" + _[2], "g")), r = y) : _[3] !== void 0 && (r = y) : r === y ? _[0] === ">" ? (r = s ?? k, p = -1) : _[1] === void 0 ? p = -2 : (p = r.lastIndex - _[2].length, h = _[1], r = _[3] === void 0 ? y : _[3] === '"' ? at : rt) : r === at || r === rt ? r = y : r === st || r === nt ? r = k : (r = y, s = void 0);
    const f = r === y && i[l + 1].startsWith("/>") ? " " : "";
    n += r === k ? a + Mt : p >= 0 ? (o.push(h), a.slice(0, p) + pt + a.slice(p) + $ + f) : a + $ + (p === -2 ? l : f);
  }
  return [gt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class H {
  constructor({ strings: t, _$litType$: e }, o) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, _] = zt(t, e);
    if (this.el = H.createElement(h, o), w.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(pt)) {
          const g = _[r++], f = s.getAttribute(p).split($), E = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: E[2], strings: f, ctor: E[1] === "." ? Bt : E[1] === "?" ? Ht : E[1] === "@" ? Rt : I }), s.removeAttribute(p);
        } else p.startsWith($) && (a.push({ type: 6, index: n }), s.removeAttribute(p));
        if (_t.test(s.tagName)) {
          const p = s.textContent.split($), g = p.length - 1;
          if (g > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < g; f++) s.append(p[f], N()), w.nextNode(), a.push({ type: 2, index: ++n });
            s.append(p[g], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ut) a.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = s.data.indexOf($, p + 1)) !== -1; ) a.push({ type: 7, index: n }), p += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = A.createElement("template");
    return o.innerHTML = t, o;
  }
}
function P(i, t, e = i, o) {
  if (t === S) return t;
  let s = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const n = B(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(i), s._$AT(i, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = s : e._$Cl = s), s !== void 0 && (t = P(i, s._$AS(i, t.values), s, o)), t;
}
class Nt {
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
    const { el: { content: e }, parts: o } = this._$AD, s = (t?.creationScope ?? A).importNode(e, !0);
    w.currentNode = s;
    let n = w.nextNode(), r = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new R(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new jt(n, this, t)), this._$AV.push(h), a = o[++l];
      }
      r !== a?.index && (n = w.nextNode(), r++);
    }
    return w.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = P(this, t, e), B(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && B(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: o } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = H.createElement(gt(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new Nt(s, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = lt.get(t.strings);
    return e === void 0 && lt.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, s = 0;
    for (const n of t) s === e.length ? e.push(o = new R(this.O(N()), this.O(N()), this, this.options)) : o = e[s], o._$AI(n), s++;
    s < e.length && (this._$AR(o && o._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const o = it(t).nextSibling;
      it(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, s, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = d;
  }
  _$AI(t, e = this, o, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = P(this, t, e, 0), r = !B(t) || t !== this._$AH && t !== S, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = P(this, l[o + a], e, a), h === S && (h = this._$AH[a]), r || (r = !B(h) || h !== this._$AH[a]), h === d ? t = d : t !== d && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ht extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Rt extends I {
  constructor(t, e, o, s, n) {
    super(t, e, o, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? d) === S) return;
    const o = this._$AH, s = t === d && o !== d || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== d && (o === d || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const Dt = U.litHtmlPolyfillSupport;
Dt?.(H, R), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.2");
const Lt = (i, t, e) => {
  const o = e?.renderBefore ?? t;
  let s = o._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    o._$litPart$ = s = new R(t.insertBefore(N(), n), n, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
let z = class extends C {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lt(e, this.renderRoot, this.renderOptions);
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
};
z._$litElement$ = !0, z.finalized = !0, T.litElementHydrateSupport?.({ LitElement: z });
const It = T.litElementPolyfillSupport;
It?.({ LitElement: z });
(T.litElementVersions ?? (T.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: Z }, Vt = (i = Gt, t, e) => {
  const { kind: o, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), o === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, i, l), l;
    } };
  }
  if (o === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function ft(i) {
  return (t, e) => typeof e == "object" ? Vt(i, t, e) : ((o, s, n) => {
    const r = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, o), r ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function bt(i) {
  return ft({ ...i, state: !0, attribute: !1 });
}
const qt = yt`
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

  .wrapper {
    position: relative;
    display: grid;
    gap: var(--cb19-content-gap, 6px);
    padding: var(--cb19-card-padding, 8px 10px 8px);
    width: 100%;
    isolation: isolate;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: var(--cb19-header-bottom, 4px);
  }

  .header-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .header-title {
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 16px;
    font-size: 0.76rem;
    line-height: 1;
    color: var(--secondary-text-color);
    flex-wrap: wrap;
  }

  .visual-box {
    position: relative;
    width: 100%;
    min-height: 88px;
    padding: var(--cb19-visual-padding, 10px 14px 6px);
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
    max-height: 96px;
  }

  .overlay-badges {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-badges-inner {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 80%;
  }

  .flag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  .flag.warn {
    background: color-mix(
      in srgb,
      var(--warning-color, #ff9800) 22%,
      var(--card-background-color)
    );
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(
      in srgb,
      var(--error-color) 22%,
      var(--card-background-color)
    );
    color: var(--error-color);
  }

  .settings-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 5;
    appearance: none;
    border: none;
    background: none;
    color: var(--secondary-text-color);
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.12s ease, transform 0.12s ease;
  }

  .settings-btn:hover {
    color: var(--primary-text-color);
    transform: scale(1.08);
  }

  .settings-btn ha-icon {
    width: 20px;
    height: 20px;
    display: block;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 18px;
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

  .text-panel {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .text-panel-main {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .text-panel-sub {
    font-size: 0.82rem;
    color: var(--secondary-text-color);
    line-height: 1.35;
  }

  .controls-wrap {
    margin-top: var(--cb19-controls-top, 2px);
  }

  .controls {
    display: grid;
    gap: 8px;
  }

  .icon-btn {
    position: relative;
    appearance: none;
    border: none;
    border-radius: 10px;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    transition:
      transform 0.08s ease,
      background 0.12s ease,
      filter 0.12s ease,
      color 0.12s ease,
      box-shadow 0.12s ease;
  }

  .icon-btn:hover {
    filter: brightness(1.06);
  }

  .icon-btn:active {
    filter: brightness(0.94);
    transform: scale(0.97);
  }

  .icon-btn ha-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    transform: translate(
      calc(-50% + var(--cb19-icon-x, 0px)),
      calc(-50% + var(--cb19-icon-y, 0px))
    );
  }

  .icon-btn {
    color: var(--cb19-icon-default-color, var(--primary-text-color));
  }

  .icon-btn.is-available.tint-enabled {
    background: color-mix(
      in srgb,
      var(--cb19-available-color, #3b82f6) 12%,
      var(--secondary-background-color)
    );
    color: var(--cb19-available-color, var(--primary-text-color));
  }

  .icon-btn.is-active {
    background: color-mix(
      in srgb,
      var(--cb19-active-color, #3b82f6) 18%,
      var(--secondary-background-color)
    );
    color: var(--cb19-active-color, var(--primary-text-color));
  }

  .icon-btn.is-active.effect-pulse {
    animation: button-pulse 1.25s ease-in-out infinite;
  }

  .icon-btn.is-active.effect-blink {
    animation: button-blink 1s steps(2, start) infinite;
  }

  .icon-btn.is-active.effect-glow {
    box-shadow: 0 0 0 1px
        color-mix(in srgb, var(--cb19-active-color, #3b82f6) 35%, transparent),
      0 0 12px
        color-mix(in srgb, var(--cb19-active-color, #3b82f6) 28%, transparent);
  }

  @keyframes button-pulse {
    0% {
      filter: brightness(0.95);
    }
    50% {
      filter: brightness(1.18);
    }
    100% {
      filter: brightness(0.95);
    }
  }

  @keyframes button-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
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
`;
function Ft(i) {
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
function x(i) {
  return i === "on";
}
function b(i, t) {
  return i?.states?.[t]?.state ?? "";
}
function q(i, t) {
  const e = i?.states?.[t]?.state;
  if (e == null || e === "" || e === "unknown" || e === "unavailable")
    return null;
  const o = Number(e);
  return Number.isFinite(o) ? o : null;
}
function Xt(i) {
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
function Kt(i) {
  return i.trim().toLowerCase().includes("enabled");
}
function Zt(i, t) {
  const e = b(i, t.gateState), o = b(i, t.lastAck), s = x(b(i, t.moving)), n = x(b(i, t.fullyOpened)), r = x(b(i, t.fullyClosed)), l = x(b(i, t.pedOpened)), a = x(b(i, t.manualStop)), h = x(b(i, t.photocell)), _ = x(b(i, t.obstruction)), p = b(i, t.pedestrianMode), g = Kt(p), f = q(i, t.gatePosition), E = q(i, t.motor1Position), $t = q(i, t.motor2Position);
  let v = "Unknown";
  return _ ? v = "Obstructed" : a ? v = "Stopped" : r ? v = "Closed" : n ? v = "Open" : l ? v = "Ped Open" : s ? v = Xt(e) : e && (v = e), {
    position: f,
    motor1Position: E,
    motor2Position: $t,
    rawState: e,
    label: v,
    moving: s,
    fullyOpened: n,
    fullyClosed: r,
    pedOpened: l,
    manualStop: a,
    photocell: h,
    obstruction: _,
    pedestrianEnabled: g,
    lastAck: o
  };
}
function Jt(i) {
  return i.moving ? {
    open: !1,
    stop: !0,
    close: !1,
    pedestrian: !1
  } : i.fullyClosed ? {
    open: !0,
    stop: !1,
    close: !1,
    pedestrian: i.pedestrianEnabled
  } : i.fullyOpened ? {
    open: !1,
    stop: !1,
    close: !0,
    pedestrian: !1
  } : i.pedOpened ? {
    open: !0,
    stop: !1,
    close: !0,
    pedestrian: !1
  } : {
    open: !0,
    stop: !1,
    close: !0,
    pedestrian: i.pedestrianEnabled
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = { CHILD: 2 }, Yt = (i) => (...t) => ({ _$litDirective$: i, values: t });
class te {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, o) {
    this._$Ct = t, this._$AM = e, this._$Ci = o;
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
class F extends te {
  constructor(t) {
    if (super(t), this.it = d, t.type !== Qt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null) return this._t = void 0, this.it = t;
    if (t === S) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
F.directiveName = "unsafeHTML", F.resultType = 1;
const ee = Yt(F), ie = `
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
function W(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function vt(i) {
  return Number(i.toFixed(5)).toString();
}
function ct(i, t) {
  return i !== null ? W(i / 100, 0, 1) : t;
}
function oe(i) {
  return i.trim().toLowerCase() === "pedopening";
}
function se(i) {
  const t = W(i, 0, 1), o = Math.max(0.035, Math.cos(t * Math.PI / 2));
  return [
    "transform-box: fill-box",
    "transform-origin: left center",
    `transform: scaleX(${vt(o)})`
  ].join("; ");
}
function ne(i) {
  const t = W(i, 0, 1), o = Math.max(0.035, Math.cos(t * Math.PI / 2));
  return [
    "transform-box: fill-box",
    "transform-origin: right center",
    `transform: scaleX(${vt(o)})`
  ].join("; ");
}
function re(i, t) {
  const e = i.position !== null ? W(i.position / 100, 0, 1) : i.fullyOpened ? 1 : i.fullyClosed ? 0 : i.pedOpened ? 0.45 : 0, o = ct(
    i.motor1Position,
    e
  ), s = ct(
    i.motor2Position,
    e
  ), n = i.moving && oe(i.rawState), r = i.pedOpened, l = i.pedestrianEnabled && (n || r);
  let a, h;
  l ? t === "left" ? (a = o, h = 0) : (a = 0, h = o) : t === "left" ? (a = o, h = s) : (a = s, h = o);
  const _ = se(a), p = ne(h), g = ie.replace(
    '<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42">',
    `<g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42" style="${_}">`
  ).replace(
    '<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42">',
    `<g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42" style="${p}">`
  );
  return u`
    <div class="gate-svg-wrap">
      ${ee(g)}
    </div>
  `;
}
const c = {
  view_mode: "graphic",
  header: {
    enabled: !1,
    title: "Gate",
    show_state: !0,
    show_position: !0,
    settings_button_position: "graphic"
  },
  settings_button: {
    enabled: !0
  },
  controls: {
    enabled: !0,
    show_open: !0,
    show_stop: !0,
    show_close: !0,
    show_pedestrian: "auto",
    available_action_tint: !0
  },
  icons: {
    open: "mdi:arrow-expand-horizontal",
    stop: "mdi:stop",
    close: "mdi:arrow-collapse-horizontal",
    pedestrian: "mdi:walk"
  },
  icon_tune: {
    x: 0,
    y: 0,
    open_x: 0,
    open_y: 0,
    stop_x: 0,
    stop_y: 0,
    close_x: 0,
    close_y: 0,
    pedestrian_x: 0,
    pedestrian_y: 0
  },
  colors: {
    icon_default: {
      open: "var(--primary-text-color)",
      stop: "var(--primary-text-color)",
      close: "var(--primary-text-color)",
      pedestrian: "var(--primary-text-color)"
    },
    icon_active: {
      open: "#22c55e",
      stop: "#ef4444",
      close: "#f59e0b",
      pedestrian: "#3b82f6"
    },
    icon_available: {
      open: "#16a34a",
      stop: "#dc2626",
      close: "#d97706",
      pedestrian: "#2563eb"
    }
  },
  effects: {
    active_action: "pulse"
  },
  padding: {
    card: "8px 10px 8px",
    visual: "10px 14px 6px",
    controls_top: "2px",
    header_bottom: "4px",
    content_gap: "6px"
  }
};
function dt(i) {
  const t = i.ui ?? {};
  return {
    view_mode: t.view_mode ?? c.view_mode,
    header: {
      enabled: t.header?.enabled ?? c.header.enabled,
      title: t.header?.title ?? c.header.title,
      show_state: t.header?.show_state ?? c.header.show_state,
      show_position: t.header?.show_position ?? c.header.show_position,
      settings_button_position: t.header?.settings_button_position ?? c.header.settings_button_position
    },
    settings_button: {
      enabled: t.settings_button?.enabled ?? c.settings_button.enabled
    },
    controls: {
      enabled: t.controls?.enabled ?? c.controls.enabled,
      show_open: t.controls?.show_open ?? c.controls.show_open,
      show_stop: t.controls?.show_stop ?? c.controls.show_stop,
      show_close: t.controls?.show_close ?? c.controls.show_close,
      show_pedestrian: t.controls?.show_pedestrian ?? c.controls.show_pedestrian,
      available_action_tint: t.controls?.available_action_tint ?? c.controls.available_action_tint
    },
    icons: {
      open: t.icons?.open ?? c.icons.open,
      stop: t.icons?.stop ?? c.icons.stop,
      close: t.icons?.close ?? c.icons.close,
      pedestrian: t.icons?.pedestrian ?? c.icons.pedestrian
    },
    icon_tune: {
      x: t.icon_tune?.x ?? c.icon_tune.x,
      y: t.icon_tune?.y ?? c.icon_tune.y,
      open_x: t.icon_tune?.open_x ?? c.icon_tune.open_x,
      open_y: t.icon_tune?.open_y ?? c.icon_tune.open_y,
      stop_x: t.icon_tune?.stop_x ?? c.icon_tune.stop_x,
      stop_y: t.icon_tune?.stop_y ?? c.icon_tune.stop_y,
      close_x: t.icon_tune?.close_x ?? c.icon_tune.close_x,
      close_y: t.icon_tune?.close_y ?? c.icon_tune.close_y,
      pedestrian_x: t.icon_tune?.pedestrian_x ?? c.icon_tune.pedestrian_x,
      pedestrian_y: t.icon_tune?.pedestrian_y ?? c.icon_tune.pedestrian_y
    },
    colors: {
      icon_default: {
        ...c.colors.icon_default,
        ...t.colors?.icon_default ?? {}
      },
      icon_active: {
        ...c.colors.icon_active,
        ...t.colors?.icon_active ?? {}
      },
      icon_available: {
        ...c.colors.icon_available,
        ...t.colors?.icon_available ?? {}
      }
    },
    effects: {
      active_action: t.effects?.active_action ?? c.effects.active_action
    },
    padding: {
      card: t.padding?.card ?? c.padding.card,
      visual: t.padding?.visual ?? c.padding.visual,
      controls_top: t.padding?.controls_top ?? c.padding.controls_top,
      header_bottom: t.padding?.header_bottom ?? c.padding.header_bottom,
      content_gap: t.padding?.content_gap ?? c.padding.content_gap
    }
  };
}
var ae = Object.defineProperty, le = Object.getOwnPropertyDescriptor, G = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? le(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && ae(t, e, s), s;
};
let O = class extends z {
  constructor() {
    super(...arguments), this._ui = dt({});
  }
  setConfig(i) {
    if (!i.controller)
      throw new Error("Missing required option: controller");
    const t = i.motor1_side === "right" ? "right" : "left";
    this._config = {
      show_debug: !1,
      settings_action: "device_page",
      motor1_side: t,
      ...i
    }, this._ui = dt(this._config);
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: "full",
      min_columns: 3
    };
  }
  get _entities() {
    return this._config ? Ft(this._config) : null;
  }
  _wrapperStyle() {
    return [
      `--cb19-card-padding: ${this._ui.padding.card}`,
      `--cb19-visual-padding: ${this._ui.padding.visual}`,
      `--cb19-controls-top: ${this._ui.padding.controls_top}`,
      `--cb19-header-bottom: ${this._ui.padding.header_bottom}`,
      `--cb19-content-gap: ${this._ui.padding.content_gap}`
    ].join("; ");
  }
  _pressButton(i) {
    !this.hass || !i || this.hass.callService("button", "press", {
      entity_id: i
    });
  }
  _formatPercent(i) {
    return i === null ? "–" : `${i.toFixed(0)}%`;
  }
  _buttonStyle(i) {
    const t = this._ui.icon_tune, e = (t.x ?? 0) + (i === "open" ? t.open_x : i === "stop" ? t.stop_x : i === "close" ? t.close_x : t.pedestrian_x), o = (t.y ?? 0) + (i === "open" ? t.open_y : i === "stop" ? t.stop_y : i === "close" ? t.close_y : t.pedestrian_y);
    return [
      `--cb19-icon-default-color: ${this._ui.colors.icon_default[i]}`,
      `--cb19-active-color: ${this._ui.colors.icon_active[i]}`,
      `--cb19-available-color: ${this._ui.colors.icon_available[i]}`,
      `--cb19-icon-x: ${e}px`,
      `--cb19-icon-y: ${o}px`
    ].join("; ");
  }
  _buttonClasses(i, t, e) {
    const o = ["icon-btn", i];
    if (e && (o.push("is-available"), this._ui.controls.available_action_tint && o.push("tint-enabled")), t) {
      o.push("is-active");
      const s = this._ui.effects.active_action;
      o.push(`effect-${s}`);
    }
    return o.join(" ");
  }
  _renderSettingsButton(i) {
    const t = this._ui.header.enabled && this._ui.header.settings_button_position === "header", e = !this._ui.header.enabled || this._ui.header.settings_button_position === "graphic";
    return !this._ui.settings_button.enabled || this._config?.settings_action === !1 ? d : {
      header: t ? u`
            <button
              class="settings-btn"
              title="Settings"
              @click=${() => this._openSettings(i)}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
          ` : d,
      graphic: e ? u`
            <button
              class="settings-btn"
              title="Settings"
              @click=${() => this._openSettings(i)}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
          ` : d
    };
  }
  _renderHeader(i, t) {
    if (!this._ui.header.enabled)
      return d;
    const e = this._renderSettingsButton(t);
    return u`
      <div class="header-row">
        <div class="header-main">
          <div class="header-title">${this._ui.header.title}</div>
          <div class="header-meta">
            ${this._ui.header.show_state ? u`<span>${i.label}</span>` : d}
            ${this._ui.header.show_state && this._ui.header.show_position ? u`<span>•</span>` : d}
            ${this._ui.header.show_position ? u`<span>${this._formatPercent(i.position)}</span>` : d}
          </div>
        </div>
        ${e.header}
      </div>
    `;
  }
  _renderOverlayFlags(i) {
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
      `), t.length ? u`
      <div class="overlay-badges">
        <div class="overlay-badges-inner">
          ${t}
        </div>
      </div>
    ` : d;
  }
  _renderMeta(i) {
    return u`
      <div class="meta-row">
        <div class="meta-state">${i.label}</div>
        <div class="meta-separator">•</div>
        <div class="meta-position">${this._formatPercent(i.position)}</div>
      </div>
    `;
  }
  _renderTextPanel(i) {
    return u`
      <div class="text-panel">
        <div class="text-panel-main">${i.label}</div>
        <div class="text-panel-sub">
          Position: ${this._formatPercent(i.position)} · M1:
          ${this._formatPercent(i.motor1Position)} · M2:
          ${this._formatPercent(i.motor2Position)}
        </div>
      </div>
    `;
  }
  _renderControls(i, t, e) {
    if (!this._ui.controls.enabled)
      return d;
    const o = t.rawState.trim().toLowerCase(), s = t.moving && o === "opening", n = t.moving && o === "closing", r = t.moving && o === "pedopening", l = t.moving || t.manualStop || t.obstruction, a = this._ui.controls.show_pedestrian === "auto" ? t.pedestrianEnabled : !!this._ui.controls.show_pedestrian, h = [
      this._ui.controls.show_open,
      this._ui.controls.show_stop,
      this._ui.controls.show_close,
      a
    ].filter(Boolean).length;
    return u`
      <div class="controls-wrap">
        <div
          class="controls"
          style=${`grid-template-columns: repeat(${h}, minmax(0, 1fr));`}
        >
          ${this._ui.controls.show_open ? u`
                <button
                  class=${this._buttonClasses(
      "open",
      s,
      e.open
    )}
                  style=${this._buttonStyle("open")}
                  title="Open"
                  @click=${() => this._pressButton(i.openButton)}
                >
                  <ha-icon icon=${this._ui.icons.open}></ha-icon>
                </button>
              ` : d}

          ${this._ui.controls.show_stop ? u`
                <button
                  class=${this._buttonClasses(
      "stop",
      l,
      e.stop
    )}
                  style=${this._buttonStyle("stop")}
                  title="Stop"
                  @click=${() => this._pressButton(i.stopButton)}
                >
                  <ha-icon icon=${this._ui.icons.stop}></ha-icon>
                </button>
              ` : d}

          ${this._ui.controls.show_close ? u`
                <button
                  class=${this._buttonClasses(
      "close",
      n,
      e.close
    )}
                  style=${this._buttonStyle("close")}
                  title="Close"
                  @click=${() => this._pressButton(i.closeButton)}
                >
                  <ha-icon icon=${this._ui.icons.close}></ha-icon>
                </button>
              ` : d}

          ${a ? u`
                <button
                  class=${this._buttonClasses(
      "pedestrian",
      r,
      e.pedestrian
    )}
                  style=${this._buttonStyle("pedestrian")}
                  title="Pedestrian Open"
                  @click=${() => this._pressButton(i.pedestrianButton)}
                >
                  <ha-icon icon=${this._ui.icons.pedestrian}></ha-icon>
                </button>
              ` : d}
        </div>
      </div>
    `;
  }
  _renderDebug(i, t) {
    return u`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Motor1 side:</strong> ${this._config?.motor1_side}</div>
        <div><strong>View mode:</strong> ${this._ui.view_mode}</div>
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
  render() {
    if (!this._config)
      return u``;
    const i = this._entities;
    if (!i)
      return u``;
    const t = Zt(this.hass, i), e = Jt(t), o = this._renderSettingsButton(i);
    return u`
      <ha-card>
        <div class="wrapper" style=${this._wrapperStyle()}>
          ${this._renderHeader(t, i)}

          ${this._ui.view_mode === "text" ? this._renderTextPanel(t) : u`
                <div class="visual-box">
                  ${re(t, this._config.motor1_side ?? "left")}
                  ${this._renderOverlayFlags(t)}
                  ${o.graphic}
                </div>
                ${this._ui.view_mode !== "graphic" ? this._renderMeta(t) : this._renderMeta(t)}
              `}

          ${this._renderControls(i, t, e)}
          ${this._config.show_debug ? this._renderDebug(i, t) : d}
        </div>
      </ha-card>
    `;
  }
};
O.styles = [qt];
G([
  ft({ attribute: !1 })
], O.prototype, "hass", 2);
G([
  bt()
], O.prototype, "_config", 2);
G([
  bt()
], O.prototype, "_ui", 2);
O = G([
  Wt("cb19-gate-card")
], O);
export {
  O as Cb19GateCard
};
