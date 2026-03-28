/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, q = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), K = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (s) => new ot(typeof s == "string" ? s : s + "", void 0, G), pt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new ot(e, s, G);
}, ut = (s, t) => {
  if (q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = z.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, Z = q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return dt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gt, defineProperty: ft, getOwnPropertyDescriptor: $t, getOwnPropertyNames: _t, getOwnPropertySymbols: mt, getPrototypeOf: vt } = Object, m = globalThis, J = m.trustedTypes, yt = J ? J.emptyScript : "", bt = m.reactiveElementPolyfillSupport, C = (s, t) => s, R = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? yt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, V = (s, t) => !gt(s, t), Y = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: V };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && ft(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = $t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const l = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [..._t(e), ...mt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(Z(r));
    } else t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
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
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : R).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : R;
      this._$Em = r;
      const l = n.fromAttribute(e, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = n.getPropertyOptions(t)), !((i.hasChanged ?? V)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: n } = o, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[C("elementProperties")] = /* @__PURE__ */ new Map(), x[C("finalized")] = /* @__PURE__ */ new Map(), bt?.({ ReactiveElement: x }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, Q = (s) => s, D = P.trustedTypes, X = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, nt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, at = "?" + _, At = `<${at}>`, A = document, U = () => A.createComment(""), M = (s) => s === null || typeof s != "object" && typeof s != "function", W = Array.isArray, wt = (s) => W(s) || typeof s?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, v = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, it = /"/g, lt = /^(?:script|style|textarea|title)$/i, xt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = xt(1), w = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), b = A.createTreeWalker(A, 129);
function ct(s, t) {
  if (!W(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const St = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = E;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let p, u, c = -1, d = 0;
    for (; d < a.length && (n.lastIndex = d, u = n.exec(a), u !== null); ) d = n.lastIndex, n === E ? u[1] === "!--" ? n = tt : u[1] !== void 0 ? n = et : u[2] !== void 0 ? (lt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = v) : u[3] !== void 0 && (n = v) : n === v ? u[0] === ">" ? (n = r ?? E, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, p = u[1], n = u[3] === void 0 ? v : u[3] === '"' ? it : st) : n === it || n === st ? n = v : n === tt || n === et ? n = E : (n = v, r = void 0);
    const g = n === v && s[l + 1].startsWith("/>") ? " " : "";
    o += n === E ? a + At : c >= 0 ? (i.push(p), a.slice(0, c) + nt + a.slice(c) + _ + g) : a + _ + (c === -2 ? l : g);
  }
  return [ct(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class T {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [p, u] = St(t, e);
    if (this.el = T.createElement(p, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(nt)) {
          const d = u[n++], g = r.getAttribute(c).split(_), B = /([.?@])?(.*)/.exec(d);
          a.push({ type: 1, index: o, name: B[2], strings: g, ctor: B[1] === "." ? Ct : B[1] === "?" ? Pt : B[1] === "@" ? Ot : j }), r.removeAttribute(c);
        } else c.startsWith(_) && (a.push({ type: 6, index: o }), r.removeAttribute(c));
        if (lt.test(r.tagName)) {
          const c = r.textContent.split(_), d = c.length - 1;
          if (d > 0) {
            r.textContent = D ? D.emptyScript : "";
            for (let g = 0; g < d; g++) r.append(c[g], U()), b.nextNode(), a.push({ type: 2, index: ++o });
            r.append(c[d], U());
          }
        }
      } else if (r.nodeType === 8) if (r.data === at) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(_, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += _.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(s, t, e = s, i) {
  if (t === w) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = S(s, r._$AS(s, t.values), r, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? A).importNode(e, !0);
    b.currentNode = r;
    let o = b.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let p;
        a.type === 2 ? p = new N(o, o.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (p = new kt(o, this, t)), this._$AV.push(p), a = i[++l];
      }
      n !== a?.index && (o = b.nextNode(), n++);
    }
    return b.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = S(this, t, e), M(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = T.createElement(ct(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new Et(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new N(this.O(U()), this.O(U()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Q(t).nextSibling;
      Q(t).remove(), t = i;
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
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = S(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== w, n && (this._$AH = t);
    else {
      const l = t;
      let a, p;
      for (t = o[0], a = 0; a < o.length - 1; a++) p = S(this, l[i + a], e, a), p === w && (p = this._$AH[a]), n || (n = !M(p) || p !== this._$AH[a]), p === h ? t = h : t !== h && (t += (p ?? "") + o[a + 1]), this._$AH[a] = p;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Pt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Ot extends j {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? h) === w) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class kt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Ut = P.litHtmlPolyfillSupport;
Ut?.(T, N), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const Mt = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = r = new N(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
let k = class extends x {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
};
k._$litElement$ = !0, k.finalized = !0, O.litElementHydrateSupport?.({ LitElement: k });
const Tt = O.litElementPolyfillSupport;
Tt?.({ LitElement: k });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: V }, Bt = (s = Nt, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ht(s) {
  return (t, e) => typeof e == "object" ? Bt(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function zt(s) {
  return ht({ ...s, state: !0, attribute: !1 });
}
const Rt = pt`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    border-radius: 16px;
  }

  .wrapper {
    display: grid;
    grid-template-rows: auto auto auto auto;
    gap: 8px;
    padding: 10px 12px 10px;
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
`;
function Dt(s) {
  const t = s.controller, e = s.entities ?? {};
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
function y(s) {
  return s === "on";
}
function $(s, t) {
  return s?.states?.[t]?.state ?? "";
}
function jt(s, t) {
  const e = s?.states?.[t]?.state;
  if (e == null || e === "" || e === "unknown" || e === "unavailable")
    return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function Lt(s, t) {
  const e = $(s, t.gateState), i = $(s, t.lastAck), r = y($(s, t.moving)), o = y($(s, t.fullyOpened)), n = y($(s, t.fullyClosed)), l = y($(s, t.pedOpened)), a = y($(s, t.manualStop)), p = y($(s, t.photocell)), u = y($(s, t.obstruction)), c = jt(s, t.gatePosition);
  let d = "Unknown";
  if (u)
    d = "Obstructed";
  else if (a)
    d = "Stopped";
  else if (r)
    if (e) {
      const g = e.toLowerCase();
      g.includes("open") ? d = "Opening" : g.includes("close") ? d = "Closing" : d = "Moving";
    } else
      d = "Moving";
  else l ? d = "Ped Open" : o ? d = "Open" : n ? d = "Closed" : e && (d = e);
  return {
    position: c,
    rawState: e,
    label: d,
    moving: r,
    fullyOpened: o,
    fullyClosed: n,
    pedOpened: l,
    manualStop: a,
    photocell: p,
    obstruction: u,
    lastAck: i
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = { CHILD: 2 }, qt = (s) => (...t) => ({ _$litDirective$: s, values: t });
class Gt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
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
class I extends Gt {
  constructor(t) {
    if (super(t), this.it = h, t.type !== It.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === h || t == null) return this._t = void 0, this.it = t;
    if (t === w) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
I.directiveName = "unsafeHTML", I.resultType = 1;
const Vt = qt(I), Wt = `
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
function Ft(s) {
  return f`
    <div class="gate-svg-wrap">
      ${Vt(Wt)}
    </div>
  `;
}
var Kt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, F = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Zt(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Kt(t, e, r), r;
};
let H = class extends k {
  setConfig(s) {
    if (!s.controller)
      throw new Error("Missing required option: controller");
    this._config = {
      title: "Gate",
      show_controls: !0,
      show_status: !0,
      show_debug: !1,
      ...s
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      rows: 2,
      columns: 12,
      min_rows: 2
    };
  }
  get _entities() {
    return this._config ? Dt(this._config) : null;
  }
  _pressButton(s) {
    !this.hass || !s || this.hass.callService("button", "press", {
      entity_id: s
    });
  }
  _renderFlags(s) {
    const t = [];
    return s.photocell && t.push(f`
        <div class="flag warn">
          <ha-icon icon="mdi:laser"></ha-icon>
          <span>Photocell</span>
        </div>
      `), s.obstruction && t.push(f`
        <div class="flag error">
          <ha-icon icon="mdi:alert-octagon"></ha-icon>
          <span>Obstruction</span>
        </div>
      `), s.manualStop && t.push(f`
        <div class="flag">
          <ha-icon icon="mdi:hand-back-right"></ha-icon>
          <span>Stopped</span>
        </div>
      `), f`
      <div class="flags-row">
        ${t.length ? t : h}
      </div>
    `;
  }
  _renderMeta(s) {
    const t = s.position === null ? "–" : `${s.position.toFixed(0)}%`;
    return f`
      <div class="meta-row">
        <div class="meta-state">${s.label}</div>
        <div class="meta-separator">•</div>
        <div class="meta-position">${t}</div>
      </div>
    `;
  }
  _renderControls(s) {
    return f`
      <div class="controls">
        <button
          class="icon-btn primary"
          title="Open"
          @click=${() => this._pressButton(s.openButton)}
        >
          <ha-icon icon="mdi:gate-open"></ha-icon>
        </button>

        <button
          class="icon-btn warn"
          title="Stop"
          @click=${() => this._pressButton(s.stopButton)}
        >
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>

        <button
          class="icon-btn primary"
          title="Close"
          @click=${() => this._pressButton(s.closeButton)}
        >
          <ha-icon icon="mdi:gate"></ha-icon>
        </button>

        <button
          class="icon-btn"
          title="Pedestrian Open"
          @click=${() => this._pressButton(s.pedestrianButton)}
        >
          <ha-icon icon="mdi:walk"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderDebug(s, t) {
    return f`
      <div class="debug-box">
        <div><strong>Controller:</strong> ${this._config?.controller}</div>
        <div><strong>Gate state entity:</strong> ${s.gateState}</div>
        <div><strong>Gate position entity:</strong> ${s.gatePosition}</div>
        <div><strong>Last ACK:</strong> ${t.lastAck || "-"}</div>
        <div><strong>Raw state:</strong> ${t.rawState || "-"}</div>
      </div>
    `;
  }
  render() {
    if (!this._config)
      return f``;
    const s = this._entities;
    if (!s)
      return f``;
    const t = Lt(this.hass, s);
    return f`
      <ha-card>
        <div class="wrapper">
          ${this._renderFlags(t)}

          <div class="visual-box">
            ${Ft()}
          </div>

          ${this._config.show_status ? this._renderMeta(t) : h}
          ${this._config.show_controls ? this._renderControls(s) : h}
          ${this._config.show_debug ? this._renderDebug(s, t) : h}
        </div>
      </ha-card>
    `;
  }
};
H.styles = [Rt];
F([
  ht({ attribute: !1 })
], H.prototype, "hass", 2);
F([
  zt()
], H.prototype, "_config", 2);
H = F([
  Ht("cb19-gate-card")
], H);
export {
  H as Cb19GateCard
};
