class Socket {
    constructor(options) {
        this.name = options.name || 'socket';
        this.state = options.state || {};
        this.position = options.position || 'left';  
        this.order = options.order || 0; 
    }
}

class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.states = [];
        this.colorIndex = options.colorIndex || 0;
        this.targetName = options.targetName || 'targetName';
    }

    writeToLog() {
        this.states.push({...this.target.state});
    }

    clear() {
        this.states = [];
    }

    get displayData() {
        return {
            name: this.name,
            targetName: this.targetName,
            colorIndex: this.colorIndex,
            states: this.states
        };
    }
}

var xhtml$1 = "http://www.w3.org/1999/xhtml";

var namespaces$1 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml$1,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace$2(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces$1.hasOwnProperty(prefix) ? {space: namespaces$1[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit$1(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml$1 && document.documentElement.namespaceURI === xhtml$1
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed$1(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator$1(name) {
  var fullname = namespace$2(name);
  return (fullname.local
      ? creatorFixed$1
      : creatorInherit$1)(fullname);
}

function none$1() {}

function selector$1(selector) {
  return selector == null ? none$1 : function() {
    return this.querySelector(selector);
  };
}

function selection_select$1(select) {
  if (typeof select !== "function") select = selector$1(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array$2(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty$1() {
  return [];
}

function selectorAll$1(selector) {
  return selector == null ? empty$1 : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll$1(select) {
  return function() {
    return array$2(select.apply(this, arguments));
  };
}

function selection_selectAll$1(select) {
  if (typeof select === "function") select = arrayAll$1(select);
  else select = selectorAll$1(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher$1(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher$1(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find$1 = Array.prototype.find;

function childFind$1(match) {
  return function() {
    return find$1.call(this.children, match);
  };
}

function childFirst$1() {
  return this.firstElementChild;
}

function selection_selectChild$1(match) {
  return this.select(match == null ? childFirst$1
      : childFind$1(typeof match === "function" ? match : childMatcher$1(match)));
}

var filter$1 = Array.prototype.filter;

function children$1() {
  return Array.from(this.children);
}

function childrenFilter$1(match) {
  return function() {
    return filter$1.call(this.children, match);
  };
}

function selection_selectChildren$1(match) {
  return this.selectAll(match == null ? children$1
      : childrenFilter$1(typeof match === "function" ? match : childMatcher$1(match)));
}

function selection_filter$1(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse$1(update) {
  return new Array(update.length);
}

function selection_enter$1() {
  return new Selection$1(this._enter || this._groups.map(sparse$1), this._parents);
}

function EnterNode$1(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode$1.prototype = {
  constructor: EnterNode$1,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$5(x) {
  return function() {
    return x;
  };
}

function bindIndex$1(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode$1(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey$1(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode$1(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum$1(node) {
  return node.__data__;
}

function selection_data$1(value, key) {
  if (!arguments.length) return Array.from(this, datum$1);

  var bind = key ? bindKey$1 : bindIndex$1,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$5(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike$1(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike$1(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit$1() {
  return new Selection$1(this._exit || this._groups.map(sparse$1), this._parents);
}

function selection_join$1(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge$1(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order$1() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort$1(compare) {
  if (!compare) compare = ascending$2;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending$2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call$1() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes$1() {
  return Array.from(this);
}

function selection_node$1() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size$1() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty$1() {
  return !this.node();
}

function selection_each$1(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr$1(name, value) {
  var fullname = namespace$2(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
}

function defaultView$1(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style$1(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove$1 : typeof value === "function"
            ? styleFunction$1
            : styleConstant$1)(name, value, priority == null ? "" : priority))
      : styleValue$1(this.node(), name);
}

function styleValue$1(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView$1(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove$1(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant$1(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property$1(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove$1 : typeof value === "function"
          ? propertyFunction$1
          : propertyConstant$1)(name, value))
      : this.node()[name];
}

function classArray$2(string) {
  return string.trim().split(/^|\s+/);
}

function classList$1(node) {
  return node.classList || new ClassList$1(node);
}

function ClassList$1(node) {
  this._node = node;
  this._names = classArray$2(node.getAttribute("class") || "");
}

ClassList$1.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd$1(node, names) {
  var list = classList$1(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove$1(node, names) {
  var list = classList$1(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue$1(names) {
  return function() {
    classedAdd$1(this, names);
  };
}

function classedFalse$1(names) {
  return function() {
    classedRemove$1(this, names);
  };
}

function classedFunction$1(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd$1 : classedRemove$1)(this, names);
  };
}

function selection_classed$1(name, value) {
  var names = classArray$2(name + "");

  if (arguments.length < 2) {
    var list = classList$1(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction$1 : value
      ? classedTrue$1
      : classedFalse$1)(names, value));
}

function textRemove$1() {
  this.textContent = "";
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text$1(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove$1 : (typeof value === "function"
          ? textFunction$1
          : textConstant$1)(value))
      : this.node().textContent;
}

function htmlRemove$1() {
  this.innerHTML = "";
}

function htmlConstant$1(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html$1(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove$1 : (typeof value === "function"
          ? htmlFunction$1
          : htmlConstant$1)(value))
      : this.node().innerHTML;
}

function raise$1() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise$1() {
  return this.each(raise$1);
}

function lower$1() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower$1() {
  return this.each(lower$1);
}

function selection_append$1(name) {
  var create = typeof name === "function" ? name : creator$1(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull$1() {
  return null;
}

function selection_insert$1(name, before) {
  var create = typeof name === "function" ? name : creator$1(name),
      select = before == null ? constantNull$1 : typeof before === "function" ? before : selector$1(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove$1() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove$1() {
  return this.each(remove$1);
}

function selection_cloneShallow$1() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep$1() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone$1(deep) {
  return this.select(deep ? selection_cloneDeep$1 : selection_cloneShallow$1);
}

function selection_datum$1(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener$1(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames$1(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove$1(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd$1(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener$1(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on$1(typename, value, options) {
  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd$1 : onRemove$1;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent$1(node, type, params) {
  var window = defaultView$1(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant$1(type, params) {
  return function() {
    return dispatchEvent$1(this, type, params);
  };
}

function dispatchFunction$1(type, params) {
  return function() {
    return dispatchEvent$1(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch$1(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction$1
      : dispatchConstant$1)(type, params));
}

function* selection_iterator$1() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root$1 = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root$1);
}

function selection_selection$1() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select$1,
  selectAll: selection_selectAll$1,
  selectChild: selection_selectChild$1,
  selectChildren: selection_selectChildren$1,
  filter: selection_filter$1,
  data: selection_data$1,
  enter: selection_enter$1,
  exit: selection_exit$1,
  join: selection_join$1,
  merge: selection_merge$1,
  selection: selection_selection$1,
  order: selection_order$1,
  sort: selection_sort$1,
  call: selection_call$1,
  nodes: selection_nodes$1,
  node: selection_node$1,
  size: selection_size$1,
  empty: selection_empty$1,
  each: selection_each$1,
  attr: selection_attr$1,
  style: selection_style$1,
  property: selection_property$1,
  classed: selection_classed$1,
  text: selection_text$1,
  html: selection_html$1,
  raise: selection_raise$1,
  lower: selection_lower$1,
  append: selection_append$1,
  insert: selection_insert$1,
  remove: selection_remove$1,
  clone: selection_clone$1,
  datum: selection_datum$1,
  on: selection_on$1,
  dispatch: selection_dispatch$1,
  [Symbol.iterator]: selection_iterator$1
};

function select$1(selector) {
  return typeof selector === "string"
      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
      : new Selection$1([[selector]], root$1);
}

function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

var noop$3 = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames$2(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames$2(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop$3, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation$1(event) {
  event.stopImmediatePropagation();
}

function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select$1(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select$1(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var constant$4 = x => () => x;

function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter$1(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable$1() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function drag() {
  var filter = defaultFilter$1,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable$1,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, nonpassive)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    select$1(event.view)
      .on("mousemove.drag", mousemoved, nonpassivecapture)
      .on("mouseup.drag", mouseupped, nonpassivecapture);
    dragDisable(event.view);
    nopropagation$1(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    noevent$1(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    select$1(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent$1(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        nopropagation$1(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent$1(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation$1(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = pointer(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = pointer(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$4(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$4(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$4(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$4(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

function define$1(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend$1(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color$1() {}

var darker$1 = 0.7;
var brighter$1 = 1 / darker$1;

var reI$1 = "\\s*([+-]?\\d+)\\s*",
    reN$1 = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP$1 = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex$1 = /^#([0-9a-f]{3,8})$/,
    reRgbInteger$1 = new RegExp(`^rgb\\(${reI$1},${reI$1},${reI$1}\\)$`),
    reRgbPercent$1 = new RegExp(`^rgb\\(${reP$1},${reP$1},${reP$1}\\)$`),
    reRgbaInteger$1 = new RegExp(`^rgba\\(${reI$1},${reI$1},${reI$1},${reN$1}\\)$`),
    reRgbaPercent$1 = new RegExp(`^rgba\\(${reP$1},${reP$1},${reP$1},${reN$1}\\)$`),
    reHslPercent$1 = new RegExp(`^hsl\\(${reN$1},${reP$1},${reP$1}\\)$`),
    reHslaPercent$1 = new RegExp(`^hsla\\(${reN$1},${reP$1},${reP$1},${reN$1}\\)$`);

var named$1 = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define$1(Color$1, color$1, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex$1, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex$1,
  formatHex8: color_formatHex8$1,
  formatHsl: color_formatHsl$1,
  formatRgb: color_formatRgb$1,
  toString: color_formatRgb$1
});

function color_formatHex$1() {
  return this.rgb().formatHex();
}

function color_formatHex8$1() {
  return this.rgb().formatHex8();
}

function color_formatHsl$1() {
  return hslConvert$1(this).formatHsl();
}

function color_formatRgb$1() {
  return this.rgb().formatRgb();
}

function color$1(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex$1.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn$1(m) // #ff0000
      : l === 3 ? new Rgb$1((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba$1(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba$1((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger$1.exec(format)) ? new Rgb$1(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent$1.exec(format)) ? new Rgb$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger$1.exec(format)) ? rgba$1(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent$1.exec(format)) ? rgba$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named$1.hasOwnProperty(format) ? rgbn$1(named$1[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb$1(NaN, NaN, NaN, 0)
      : null;
}

function rgbn$1(n) {
  return new Rgb$1(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba$1(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb$1(r, g, b, a);
}

function rgbConvert$1(o) {
  if (!(o instanceof Color$1)) o = color$1(o);
  if (!o) return new Rgb$1;
  o = o.rgb();
  return new Rgb$1(o.r, o.g, o.b, o.opacity);
}

function rgb$2(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert$1(r) : new Rgb$1(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb$1(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define$1(Rgb$1, rgb$2, extend$1(Color$1, {
  brighter(k) {
    k = k == null ? brighter$1 : Math.pow(brighter$1, k);
    return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker$1 : Math.pow(darker$1, k);
    return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb$1(clampi$1(this.r), clampi$1(this.g), clampi$1(this.b), clampa$1(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex$1, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex$1,
  formatHex8: rgb_formatHex8$1,
  formatRgb: rgb_formatRgb$1,
  toString: rgb_formatRgb$1
}));

function rgb_formatHex$1() {
  return `#${hex$1(this.r)}${hex$1(this.g)}${hex$1(this.b)}`;
}

function rgb_formatHex8$1() {
  return `#${hex$1(this.r)}${hex$1(this.g)}${hex$1(this.b)}${hex$1((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb$1() {
  const a = clampa$1(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi$1(this.r)}, ${clampi$1(this.g)}, ${clampi$1(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa$1(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi$1(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex$1(value) {
  value = clampi$1(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla$1(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl$1(h, s, l, a);
}

function hslConvert$1(o) {
  if (o instanceof Hsl$1) return new Hsl$1(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color$1)) o = color$1(o);
  if (!o) return new Hsl$1;
  if (o instanceof Hsl$1) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl$1(h, s, l, o.opacity);
}

function hsl$1(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert$1(h) : new Hsl$1(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl$1(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define$1(Hsl$1, hsl$1, extend$1(Color$1, {
  brighter(k) {
    k = k == null ? brighter$1 : Math.pow(brighter$1, k);
    return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker$1 : Math.pow(darker$1, k);
    return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb$1(
      hsl2rgb$1(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb$1(h, m1, m2),
      hsl2rgb$1(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl$1(clamph$1(this.h), clampt$1(this.s), clampt$1(this.l), clampa$1(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa$1(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph$1(this.h)}, ${clampt$1(this.s) * 100}%, ${clampt$1(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph$1(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt$1(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb$1(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant$3 = x => () => x;

function linear$2(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential$1(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma$1(y) {
  return (y = +y) === 1 ? nogamma$1 : function(a, b) {
    return b - a ? exponential$1(a, b, y) : constant$3(isNaN(a) ? b : a);
  };
}

function nogamma$1(a, b) {
  var d = b - a;
  return d ? linear$2(a, d) : constant$3(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma$1(y);

  function rgb$1(start, end) {
    var r = color((start = rgb$2(start)).r, (end = rgb$2(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma$1(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function interpolateNumber$1(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

var reA$1 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB$1 = new RegExp(reA$1.source, "g");

function zero$2(b) {
  return function() {
    return b;
  };
}

function one$1(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA$1.lastIndex = reB$1.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA$1.exec(a))
      && (bm = reB$1.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber$1(am, bm)});
    }
    bi = reB$1.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one$1(q[0].x)
      : zero$2(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

var degrees = 180 / Math.PI;

var identity$1$1 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$1$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$1$1;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1$1;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber$1(xa, xb)}, {i: i - 2, x: interpolateNumber$1(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber$1(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber$1(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber$1(xa, xb)}, {i: i - 2, x: interpolateNumber$1(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

var frame = 0, // is an animation frame pending?
    timeout$1 = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

function interpolate$1(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber$1
      : b instanceof color$1 ? interpolateRgb
      : (c = color$1(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove$2(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$2(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS$2(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction$2(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS$2(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace$2(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate$1;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS$2 : attrFunction$2)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS$2 : attrRemove$2)(fullname)
      : (fullname.local ? attrConstantNS$2 : attrConstant$2)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace$2(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector$1(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll$1(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection$2 = selection.prototype.constructor;

function transition_selection() {
  return new Selection$2(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue$1(this, name),
        string1 = (this.style.removeProperty(name), styleValue$1(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove$2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$2(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue$1(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction$2(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue$1(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue$1(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove$2(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate$1;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove$2(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction$2(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant$2(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant$2(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction$2(tweenValue(this, "text", value))
      : textConstant$2(value == null ? "" : value + ""));
}

function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var constant$2$1 = x => () => x;

function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$3 = new Transform(1, 0, 0);

Transform.prototype;

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || identity$3;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

function zoom() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = interpolateZoom,
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity$3.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select$1(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = select$1(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = pointer(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    noevent(event);
    if (duration > 0) select$1(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select$1(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select$1(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$2$1(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2$1(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2$1(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$2$1([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}

function tree_add(d) {
  const x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

function tree_cover(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

function tree_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}

function tree_extent(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

function Quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

function tree_find(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

function tree_remove(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

function tree_root() {
  return this._root;
}

function tree_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}

function tree_visit(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}

function tree_visitAfter(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

function defaultX(d) {
  return d[0];
}

function tree_x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

function defaultY(d) {
  return d[1];
}

function tree_y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

function constant$1$1(x) {
  return function() {
    return x;
  };
}

function jiggle$1(random) {
  return (random() - 0.5) * 1e-6;
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a$1 = 1664525;
const c$1 = 1013904223;
const m = 4294967296; // 2^32

function lcg() {
  let s = 1;
  return () => (s = (a$1 * s + c$1) % m) / m;
}

function x$1$1(d) {
  return d.x;
}

function y$1$1(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

function simulation(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = new Map(),
      stepper = timer(step),
      event = dispatch("tick", "end"),
      random = lcg();

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.forEach(function(force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

function manyBody() {
  var nodes,
      node,
      random,
      alpha,
      strength = constant$1$1(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x$1$1, y$1$1).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle$1(random), l += x * x;
        if (y === 0) y = jiggle$1(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = jiggle$1(random), l += x * x;
      if (y === 0) y = jiggle$1(random), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$1$1(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}

class Observable{

    constructor(options){
        if (!options) { options={}; }        this.flag = options.flag || false;
        this._state = options.state;
        this.observers=[];
        this.observerIdMax = 0;
    }

    set state(data){

        this._state = data;
        
        if( this.flag && this._state ) {
            this.observers.forEach( (observer) => {
                observer.observer();
            } );
            this._state = false;
        } else {
            this.observers.forEach( (observer) => {
                observer.observer(data);
            } );
        }

    }  

    get state(){
        return this._state;
    }

    subscribe(observer) {

        let id = this.observerIdMax;
        this.observers.push({observer,id});
        this.observerIdMax++;
        return id;

    }

    isSubscribed(observer) {

        return this.observers.map( d => d.observer).includes(observer);

    }

    isSubscribedById(id) {

        return this.observers.map( d => d.id).includes(id);

    }

    unsubscribe(observer) {

        this.observers = this.observers.filter(item => item.observer !== observer);

    }

    unsubscribeById(id) {
            
        this.observers = this.observers.filter(item => item.id !== id);
    
    }   


    setObserverFirstById(id) {

        let observer = this.observers.filter(item => item.id === id)[0];
        this.observers = this.observers.filter(item => item.id !== id);
        this.observers.unshift(observer);

    }

    setObserverLastById(id) {
            
        let observer = this.observers.filter(item => item.id === id)[0];
        this.observers = this.observers.filter(item => item.id !== id);
        this.observers.push(observer);
    
    }

}

// modified d3 collide.js to use the center of the rectangle


function constant$6 (x) {
    return function() {
      return x;
    };
}

function jiggle(random) {
    return (random() - 0.5) * 1e-6;
}

function x$2(d) {
  return d.x + 0.5*d.width + d.vx;
}

function y$2(d) {
  return d.y + 0.5*d.height + d.vy;
}

function collideRectCenter(radius) {
  var nodes,
      radii,
      random,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant$6(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x$2, y$2).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        //console.log(node);
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + 0.5*node.width + node.vx;
        yi = node.y + 0.5*node.height + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          let x = xi - (data.x + 0.5*data.width) - data.vx,
              y = yi - (data.y + 0.5*data.height) - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(random), l += x * x;
            if (y === 0) y = jiggle(random), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$6(+_), initialize(), force) : radius;
  };

  return force;
}

let Box$1 = class Box {
    constructor(options) {
        this.className = options.className || "";
        this.sharedState = {};
        this.boxes = [];
        this.maxBox = 0;
        this.id = options.id || "cont-0";
        this.parentId = options.parentId || "board-0";
        this.boardId = options.boardId || "board-0";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 200;
        this.height = options.height || 300;
        this.heightPerCent = options.heightPerCent;
        this.widthPerCent = options.widthPerCent;
        this.xPerCent = options.xPerCent;
        this.yPerCent = options.yPerCent;
        this.quantiseX = options.quantiseX || false;
        this.quantiseY = options.quantiseY || false;
        this.margin = options.margin || 0;
        this.gridX = options.gridX;
        this.gridWidth = options.gridWidth;
        this.gridY = options.gridY;
        this.gridHeight = options.gridHeight;
        this.fixed = options.fixed || false;
        this.sharedState.gridXMax = options.gridXMax || 12;
        this.allowChildrenResizeOnBoardZoom = options.allowChildrenResizeOnBoardZoom || true;
        this.autoLayout = options.autoLayout || false;
        this.autoNoOverlap = options.autoNoOverlap || false;
        this.boxInsertOrder = [];
        this.boxesSharedStateKeys = options.boxesSharedStateKeys || ["boxId"];
        this.componentMargin = options.componentMargin || {top:10, right:10, bottom:10, left:10};
        const requestAutoLayout = new Observable({flag:true, state:false});
        requestAutoLayout.subscribe(this.setAutoLayoutAndUpdate.bind(this));
        const requestAutoNoOverlap = new Observable({flag:false, state:{}});
        requestAutoNoOverlap.subscribe(this.setAutoNoOverlap.bind(this));
        const checkInsertOrder = new Observable({state:{pt:{x:0,y:0},id:"box-0"}});
        checkInsertOrder.subscribe(this.setInsertOrder.bind(this));
        const requestUpdateBoxes = new Observable({flag:false, state:{boxesToAdd:[], boxesToRemove:[]}});
        requestUpdateBoxes.subscribe(this.updateBoxes.bind(this));
        this.sharedState = {...this.sharedState, requestAutoLayout, requestAutoNoOverlap, checkInsertOrder, requestUpdateBoxes};
        this.component = options.component;
        if (this.autoNoOverlap) {
            this.createForceSimulation();
        }
        this.locationForChildBoxes = options.locationForChildBoxes;
    }

    addBox(box) {
        const id = this.getNewBoxId;
        box.id = id;
        box.boxId = id;
        if (this.locationForChildBoxes !== undefined) {
            this.parentIdForChildBoxes = `${this.boxId}-${this.locationForChildBoxes}`;
        } else {
            this.parentIdForChildBoxes = this.boxId;
        }
        box.parentId = this.parentIdForChildBoxes;
        box.parentBoxId = this.boxId;
        box.untransformed = {x:box.x, y:box.y, width:box.width, height:box.height};
        box.sharedStateByAncestorId = {...this.sharedStateByAncestorId};
        box.sharedStateByAncestorId[this.id] = this.sharedState;
        box.ancestorIds = [...this.ancestorIds];
        box.ancestorIds.push(this.boxId);
        const component = box.component;
        if (component !== undefined) {
            component.sharedState = box.sharedState;
            component.sharedStateByAncestorId = box.sharedStateByAncestorId;
            component.ancestorIds = box.ancestorIds;
            component.id = box.componentId;
            component.boxId = box.boxId;
            component.boardId = this.boardId;
        }
        this.boxes.push(box);
        this.boxInsertOrder.push(box.id);
        const boxesSharedStateKeys = this.boxesSharedStateKeys;
        const boxesSharedState = this.boxes.map(box => {
            const boxStateToShare = {};
            boxesSharedStateKeys.forEach( key => {
                if ( component !== undefined) {
                    boxStateToShare[key] = box.component[key];
                } else {
                    boxStateToShare[key] = box[key];
                }
            });
            return boxStateToShare;
        });
        this.sharedState.boxes = boxesSharedState;
        if (this.autoNoOverlap) {
            this.createForceSimulation();
        }
        return id;
    }

    removeBox(id) {
        const box = this.boxes.find( box => box.id == id );
        if ( box.component ) {
            box.component.remove();
        }
        this.boxes = this.boxes.filter( box => box.id !== id);
        this.sharedState.boxes = this.sharedState.boxes.filter( box => box.boxId !== id);
        this.boxInsertOrder = this.boxInsertOrder.filter( boxId => boxId !== id);
        select$1(`#${id}`).remove();
    }

    updateBoxes(data) {
        const boxesToAdd = data.boxesToAdd;
        const boxesToRemove = data.boxesToRemove;
        boxesToAdd.forEach( box => {
            this.addBox(box);
        });
        boxesToRemove.forEach( boxId => {
            this.removeBox(boxId);
        });
        boxesToAdd.forEach( box => {
            box.make();
        });
        this.setAutoLayoutAndUpdate();
    }

    get getNewBoxId() {
        const id = `${this.boxId}-box-${this.maxBox}`;
        this.maxBox++;
        return id;
    }

    get componentId() {
        const id = `${this.boxId}-component`;
        return id;
    }

    get getAllBoxes() {
        const allBoxes = [];
        const search = (boxes) => {
            boxes.forEach( box => {
                allBoxes.push(box);
                if (box.boxes.length !== 0) {
                    search(box.boxes);
                }
            });
        };       
        search(this.boxes);
        return allBoxes;
    }

    setSize() {
        const parentNode = select$1(`#${this.parentBoxId}`).node();
        const gridXMax = this.sharedStateByAncestorId[this.parentBoxId].gridXMax;
        this.dx = parentNode.clientWidth / gridXMax;
        if ( this.widthPerCent !== undefined ) {
            this.width = this.widthPerCent/100 * parentNode.clientWidth;
        }
        if ( this.heightPerCent !== undefined ) {
            this.height = this.heightPerCent/100 * parentNode.clientHeight;
        }
        if ( this.quantiseX ) {
            this.x = this.gridX * this.dx;
            this.width = this.gridWidth * this.dx;
        }
        if ( this.quantiseY ) {
            this.y = this.gridY * this.dx;
            this.height = this.gridHeight * this.dx;
        }
        if ( this.xPerCent !== undefined ) {
            this.x = this.xPerCent/100 * parentNode.clientWidth;
        }
        if ( this.yPerCent !== undefined ) {
            this.y = this.yPerCent/100 * parentNode.clientHeight;
        }
    }

    setQuantise() {
        const parentNode = select$1(`#${this.parentId}`).node();
        const gridXMax = this.sharedStateByAncestorId[this.parentBoxId].gridXMax;
        this.dx = parentNode.clientWidth / gridXMax;
        if ( this.quantiseX ) {
            this.gridX = Math.round( this.x / this.dx);
            this.x = this.gridX * this.dx;
            this.gridWidth = Math.round( this.width / this.dx);
            this.width = this.gridWidth * this.dx;
        }
        if ( this.quantiseY ) {
            this.gridY = Math.round( this.y / this.dx);
            this.y = this.gridY * this.dx;
            this.gridHeight = Math.round( this.height / this.dx);
            this.height = this.gridHeight * this.dx;
        }
    }

    setUntransformed() {
        const t = this.sharedStateByAncestorId[this.boardId].transform;
        const u = {};
        u.width = this.width / t.k;
        u.height = this.height / t.k;
        u.x = (this.x - t.x ) /t.k;
        u.y = (this.y - t.y ) /t.k;
        this.untransformed = u;
    }

    renderDivPosition() {
        select$1(`#${this.id}`)
            .style("width",`${this.width - 2*this.margin}px`)
            .style("height",`${this.height - 2*this.margin}px`)
            .style("left", `${this.x + this.margin}px`)
            .style("top", `${this.y + this.margin}px`); 
    }

    raiseDiv() {
        select$1(`#${this.id}`).raise();
    }

    makeComponentDiv() {
        const div = select$1(`#${this.id}`);
        div.append("div")
            .attr("id", `${this.componentId}`)
            .attr("class", "board-box-component")
            .style("width",`${this.width - this.componentMargin.left - this.componentMargin.right}px`)
            .style("height",`${this.height - this.componentMargin.top - this.componentMargin.bottom}px`)
            .style("left", `${this.componentMargin.left}px`)
            .style("top", `${this.componentMargin.top}px`)
            .style("position","absolute")
            .style("overflow","hidden")
            .style("pointer-events","none");
    }

    updateComponentDiv() {
        const div = select$1(`#${this.id}`);
        const componentDiv = div.select(".board-box-component");
        componentDiv
            .style("width",`${this.width - this.componentMargin.left - this.componentMargin.right}px`)
            .style("height",`${this.height - this.componentMargin.top - this.componentMargin.bottom}px`)
            .style("left", `${this.componentMargin.left}px`)
            .style("top", `${this.componentMargin.top}px`);
    }


    setAutoLayout() {
        if ( !this.autoLayout ) {
            return;
        }
        let containerWidth = this.width;
        this.height;
        let iCol = 0;
        let iSubRow = 0;
        let insertPosition = {x:0, y:0};
        let rowHeight = 0;
        let rowHeightPrev;
        let rowTop = 0;
        let colWidth = 0;
        this.boxInsertOrder.forEach( nextBoxId => {
            let nextBox = this.boxes.find( d => d.id == nextBoxId );
            let nextBoxWidth = nextBox.width;
            let nextBoxHeight = nextBox.height;
            let boxInserted = false;
            let counter = 0;
            while ( !boxInserted && counter < 10 ) {
                //console.log(counter);
                if ( iSubRow == 0 && iCol == 0 ) {
                    rowHeight = nextBoxHeight+1; // +1 to avoid rounding errors
                }
                if ( iSubRow == 0) {
                    rowHeightPrev = rowHeight;
                    rowHeight = Math.max(rowHeight, nextBoxHeight);
                }
                let availableWidth = containerWidth - insertPosition.x;
                let availableHeight = rowTop + rowHeight - insertPosition.y;
                let widthFits = false;
                let heightFits = false;
                //console.log({availableWidth, availableHeight, nextBoxWidth, nextBoxHeight, insertPosition,iCol, iSubRow, colWidth, rowHeight, rowTop, rowHeightPrev});
                if ( nextBoxWidth <= availableWidth && iSubRow == 0 ) {
                    widthFits = true;
                }
                if ( nextBoxWidth <= colWidth && iSubRow > 0 ) {
                    widthFits = true;
                }
                if ( nextBoxHeight <= availableHeight ) {
                    heightFits = true;
                }
                if ( iCol == 0 && iSubRow == 0) {
                    widthFits = true;
                }
                if ( widthFits && heightFits ) { // insert box
                    //console.log("inserted");
                    nextBox.x = insertPosition.x;
                    nextBox.y = insertPosition.y; 
                    insertPosition.y += nextBoxHeight;
                    colWidth = Math.max(colWidth, nextBoxWidth);
                    iSubRow++;
                    boxInserted = true;
                }
                if ( !widthFits && iSubRow == 0) { // box is too wide, start next full row
                    //console.log("too wide, start new full row");
                    if ( rowHeight == nextBoxHeight ) {
                        rowHeight = rowHeightPrev;
                    }
                    insertPosition.x = 0;
                    insertPosition.y = rowTop + rowHeight;
                    rowTop += rowHeight;
                    iCol = 0;
                    iSubRow = 0;
                }
                if ( !widthFits && iSubRow > 0) { // box is too wide for this col, start next col
                    //console.log("too wide, start new col");
                    insertPosition.x += colWidth;
                    insertPosition.y = rowTop;
                    iCol++;
                    iSubRow = 0;
                    colWidth = 0;
                }
                if ( !heightFits ) { // box is too high, start next col
                    //console.log("too high, start new col");
                    insertPosition.x += colWidth;
                    insertPosition.y = rowTop;
                    iCol++;
                    iSubRow = 0;
                    colWidth = 0;
                }
                counter++;
            }
        });
    }

    setAutoLayoutAndUpdate() {
        this.setAutoLayout();
        this.updateDescendants("normal");
    }

    createForceSimulation() {
        if ( this.simulation !== undefined ) {
            this.simulation.stop();
        }
        this.width;
        this.height;
        const boundUpdateDescendants = this.updateDescendants.bind(this);
        const simulation$1 = simulation(this.boxes)
            //.force("center", d3.forceCenter(width/2, height/2))
            .force("manyBody", manyBody().strength(100))
            .force("collide", collideRectCenter( d => 0.45*Math.sqrt(d.width**2 + d.height**2) ).iterations(4))
            .on("tick", function() {
                if (this.alpha() < this.alphaMin()) {
                    boundUpdateDescendants("normal");
                } else {
                    boundUpdateDescendants("layout");
                }
            })
            .alpha(1.)
            .alphaTarget(0.)
            .alphaDecay(0.1)
            .alphaMin(0.5);
            //.stop();
        this.simulation = simulation$1;
    }


    setAutoNoOverlap(options) {
        if ( !this.autoNoOverlap ) {
            return;
        }
        const reset = options.reset;
        const fixedId = options.fixedId;
        this.boxes.filter( box => box.id !== fixedId).forEach( box => {
            if ( box.id !== fixedId ) {
                box.fx = null;
                box.fy = null;
            }
        });
        if ( reset ) {
            this.createForceSimulation();
        } else {
            this.simulation.alpha(1).restart();
        }
    }

    requestParentAutoLayout() {
        const parentSharedState = this.sharedStateByAncestorId[this.parentBoxId];
        if ( parentSharedState.requestAutoLayout !== undefined) {
            parentSharedState.requestAutoLayout.state = true;
        }
    }

    requestParentAutoNoOverlap(reset, fixedId) {
        //this.boxes.filter( box => box.id !== fixedId).forEach( box => {
        //    box.fx = null;
        //    box.fy = null;
        //});
        const parentSharedState = this.sharedStateByAncestorId[this.parentBoxId];
        if ( parentSharedState.requestAutoNoOverlap !== undefined) {
            parentSharedState.requestAutoNoOverlap.state = {reset, fixedId};
        }
    }

    setParentInsertOrder(data) {
        const parentSharedState = this.sharedStateByAncestorId[this.parentBoxId];
        if ( parentSharedState.checkInsertOrder !== undefined) {
            this.sharedStateByAncestorId[this.parentBoxId].checkInsertOrder.state = data;
        }
    }

    setInsertOrder(data) {
        const pt = data.pt;
        const id = data.id;
        let boxInsertOrder = this.boxInsertOrder;
        let found = false;
        let boxInsertOrderNew;
        this.boxes.forEach( box => {
            let xmin = box.x + 1;
            let xmax = box.x + box.width -2;
            let ymin = box.y + 1;
            let ymax = box.y + box.height -2;
            if ( pt.x > xmin && pt.x <= xmax && pt.y >= ymin && pt.y <= ymax && id !== box.id ) {
                found = true;
                let insertPointId = box.id;
                boxInsertOrderNew = boxInsertOrder.filter( boxId => boxId !== id);
                let insertIndex = boxInsertOrderNew.indexOf(insertPointId);
                boxInsertOrderNew.splice(insertIndex,0,id);
            }
        });
        if ( found ) {
            this.boxInsertOrder = boxInsertOrderNew;
        }
    }

    drag(event) {
        this.x = event.x;
        this.y = event.y;
        this.fx = event.x;
        this.fy = event.y;
        this.setQuantise();
        this.raiseDiv();
        this.update("move");
        this.updateDescendants("move");
        this.requestParentAutoNoOverlap(false, this.id);
    }

    dragEnd(event) {
        this.setParentInsertOrder({pt:{x:event.x, y:event.y}, id:this.id});
        this.requestParentAutoLayout();
        this.requestParentAutoNoOverlap(false, this.id);
    }

    leftDrag(event) {
        this.x = event.x;
        let dx = this.x - this.x0;
        this.width = this.width0 - dx;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    rightDrag(event) {
        this.width = event.x;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    bottomDrag(event) {
        this.height = event.y;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true,this.id);
    }

    bottomLeftDrag(event) {
        this.x = event.x;
        let dx = this.x - this.x0;
        this.width = this.width0 - dx;
        this.height = event.y;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    bottomRightDrag(event) {
        this.width = event.x;
        this.height = event.y;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    topLeftDrag(event) {
        this.x = event.x;
        this.y = event.y;
        let dx = this.x - this.x0;
        this.width = this.width0 - dx;
        let dy = this.y - this.y0;
        this.height = this.height0 - dy;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    topRightDrag(event) {
        this.y = event.y;
        this.width = event.x;
        let dy = this.y - this.y0;
        this.height = this.height0 - dy;
        this.setQuantise();
        this.raiseDiv();
        this.update("normal");
        this.updateDescendants("normal");
        this.fx = this.x;
        this.fy = this.y;
        this.requestParentAutoNoOverlap(true, this.id);
    }

    dragStart(event){
        this.x0 = this.x;
        this.y0 = this.y;
        this.width0 = this.width;
        this.height0 = this.height;
        this.fx = this.x;
        this.fy = this.y;
        //this.raiseDiv();
    }

    make() {
        const boundDrag = this.drag.bind(this);
        const boundLeftDrag = this.leftDrag.bind(this);
        const boundRightDrag = this.rightDrag.bind(this);
        const boundBottomDrag = this.bottomDrag.bind(this);
        const boundBottomLeftDrag = this.bottomLeftDrag.bind(this);
        const boundBottomRightDrag = this.bottomRightDrag.bind(this);
        const boundTopLeftDrag = this.topLeftDrag.bind(this);
        const boundTopRightDrag = this.topRightDrag.bind(this);
        const boundDragStart = this.dragStart.bind(this);
        const boundDragEnd = this.dragEnd.bind(this);
        this.requestParentAutoLayout.bind(this);
        const parentDiv = select$1(`#${this.parentId}`);
        this.setSize();
        const div = parentDiv.append("div")
            .datum({"id":this.id})
            .attr("class", `board-box ${this.className}`)
            .attr("id", this.id)
            .style("width",`${this.width - 2*this.margin}px`)
            .style("height",`${this.height - 2*this.margin}px`)
            .style("left", `${this.x + this.margin}px`)
            .style("top", `${this.y + this.margin}px`)
            .style("position","absolute")
            .style("overflow","hidden");
        if (!this.fixed) {
            div.call(drag()
                .subject((e)=>({x: this.x, y: this.y }))
                .on("start", boundDragStart )
                .on("drag", boundDrag )
                .on("end", boundDragEnd ));
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-left-drag")
            .style("left","-5px")
            .style("top","10px")
            .style("width", "15px")
            .style("height", "calc(100% - 20px)" )
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.x, y: 0. }))
                .container( () => { return select$1(`#${this.id}`).node().parentNode } ) 
                .on("start", boundDragStart )
                .on("drag", boundLeftDrag )
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-right-drag")
            .style("right", "-5px")
            .style("top","10px")
            .style("width", "15px")
            .style("height", "calc(100% - 20px)")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.width, y: 0. }))
                .on("start", boundDragStart )
                .on("drag", boundRightDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-bottom-drag")
            .style("left", "10px")
            .style("bottom","-5px")
            .style("width", "calc(100% - 20px)")
            .style("height", "15px")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: 0., y: this.height  }))
                .on("start", boundDragStart )
                .on("drag", boundBottomDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-bottom-left-drag")
            .style("left", "-5px")
            .style("bottom","-5px")
            .style("width", "15px")
            .style("height", "15px")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.x, y: this.height  }))
                .container( () => { return select$1(`#${this.id}`).node().parentNode } ) 
                .on("start", boundDragStart )
                .on("drag", boundBottomLeftDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-bottom-right-drag")
            .style("right", "-5px")
            .style("bottom","-5px")
            .style("width", "15px")
            .style("height", "15px")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.width, y: this.height  }))
                .on("start", boundDragStart ) 
                .on("drag", boundBottomRightDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-top-left-drag")
            .style("left", "-5px")
            .style("top","-5px")
            .style("width", "15px")
            .style("height", "15px")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.x, y: this.y  }))
                .container( () => { return select$1(`#${this.id}`).node().parentNode } )
                .on("start", boundDragStart ) 
                .on("drag", boundTopLeftDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (!this.fixed) {
        div.append("div")
            .attr("class","board-box-top-right-drag")
            .style("right", "-5px")
            .style("top","-5px")
            .style("width", "15px")
            .style("height", "15px")
            .style("position","absolute")
            .call(drag()
                .subject((e) => ({x: this.width, y: this.y  }))
                .container( () => { return select$1(`#${this.id}`).node().parentNode } ) 
                .on("start", boundDragStart )
                .on("drag", boundTopRightDrag)
                //.on("end", boundRequestParentAutoLayout));
                .on("end", boundDragEnd )); 
        }

        if (this.component !== undefined) {
            this.makeComponentDiv();
            this.component.updateType = "normal";
            this.component.make();
        }
        this.update("normal");
    }

    update(type="normal") {
        this.setSize();
        this.renderDivPosition();

        if (this.autoLayout) {
            this.setAutoLayout();
        }
        if (this.component !== undefined) {
            this.updateComponentDiv();
            this.component.updateType = type;
            this.component.update();
        }
        this.setUntransformed();
    }

    updateDescendants(type="normal") {
        //const div = d3.select(`#${this.id}`);
        //const boxes = div.selectChildren(".board-box")
        //    .data(this.getAllBoxes, k => k.id);
        //boxes.each(boxUpdateForD3Each);
        this.getAllBoxes.forEach( box => {
            box.update(type);
        });   
    }

};

const boxMakeForD3Each = function( d, i ) {

    d.make();

};

const boxUpdateForD3Each = function( d, i ) {

    d.update("normal");

};

let Board$1 = class Board {
    constructor(options) {
        if (!options) { options={}; }        this.targetId = options.targetId || "target";
        this.sharedState = {};
        this.sharedStateByAncestorId = {};
        this.ancestorIds = [];
        this.sharedState.offset = {x:0, y:0};
        this.sharedState.transform = {x:0, y:0, k:1};
        this.sharedState.preventZoom = false;
        this.className = options.className || "";
        this.boxes = options.boxes || [];
        this.maxBox = 0;
        this.width = options.width || 200;
        this.height = options.height || 300;
        this.heightPerCent = options.heightPerCent;
        this.widthPerCent = options.widthPerCent;
        this.fixed = options.fixed || false;
        this.sharedState.gridXMax = options.gridXMax || 12;
        const requestUpdateBoxes = new Observable({flag:false, state:{boxesToAdd:[], boxesToRemove:[]}});
        requestUpdateBoxes.subscribe(this.updateBoxes.bind(this));
        this.sharedState.requestUpdateBoxes = requestUpdateBoxes;
    }

    get getAllBoxes() {
        const allBoxes = [];
        const search = (boxes) => {
            boxes.forEach( box => {
                allBoxes.push(box);
                if (box.boxes.length !== 0) {
                    search(box.boxes);
                }
            });
        };       
        search(this.boxes);
        return allBoxes;
    }
    

    get getNewBoxId() {
        const id = `${this.id}-box-${this.maxBox}`;
        this.maxBox++;
        return id;
    }

    setSize() {
        const div = select$1(`#${this.id}`);
        const parentNode = div.node().parentNode;
        if ( this.widthPerCent !== undefined ) {
            this.width = this.widthPerCent/100 * parentNode.clientWidth;
        }
        if ( this.heightPerCent !== undefined ) {
            this.height = this.heightPerCent/100 * parentNode.clientHeight;
        }
    }

    addBox(box) {
        const id = this.getNewBoxId;
        box.id = id;
        box.boxId = id;
        box.parentId = this.id;
        box.parentBoxId = this.id;
        box.boardId = this.id;
        box.untransformed = {x:box.x, y:box.y, width:box.width, height:box.height};
        box.sharedStateByAncestorId = {...this.sharedStateByAncestorId};
        box.sharedStateByAncestorId[this.id] = this.sharedState;
        box.ancestorIds = [...this.ancestorIds];
        box.ancestorIds.push(this.id);
        const component = box.component;
        if (component !== undefined) {
            component.sharedState = box.sharedState;
            component.sharedStateByAncestorId = box.sharedStateByAncestorId;
            component.ancestorIds = box.ancestorIds;
            component.id = box.componentId;
            component.boxId = box.id;
            component.boardId = this.id;
        }
        this.boxes.push(box);
        return id;
    }

    make() {
        const boundZoomed = this.zoomed.bind(this);
        select$1(`#${this.targetId}`).attr("id", this.id);
        this.setSize();
        select$1(`#${this.id}`)
            .attr("class", `board ${this.className}`)
            .style("width",`${this.width}px`)
            .style("height",`${this.height}px`)
            .style("position","relative")
            .style("overflow","hidden");
        if (!this.fixed) {
            select$1('#${this.id}').call(zoom().on("zoom", boundZoomed));
        }
        this.update();
    }

    update() {
        const div = select$1(`#${this.id}`);
        const boxes = div.selectAll(".board-box")
            .data(this.getAllBoxes, k => k.id);
        boxes.enter().each(boxMakeForD3Each);
        boxes.exit().remove();
        boxes.each(boxUpdateForD3Each);
    }

    zoomed(event, d) {
        if (this.sharedState.preventZoom) {
            return;
        }
        const t = event.transform;
        this.sharedState.transform = {x:t.x, y:t.y, k:t.k};
        this.boxes.forEach( box => {
            const u = box.untransformed;
            box.x = t.k*u.x + t.x; 
            box.y = t.k*u.y + t.y; 
            box.width = u.width * t.k;
            box.height = u.height * t.k;
            if (box.allowChildrenResizeOnBoardZoom) {
                box.boxes.forEach( childBox => {
                    const uc = childBox.untransformed;
                    childBox.x = t.k*uc.x + t.x; 
                    childBox.y = t.k*uc.y + t.y; 
                    childBox.width = uc.width * t.k;
                    childBox.height = uc.height * t.k;
                });
            }
        });
       
        const boardDiv = select$1(`#${this.id}`);
        //    .style("background-position", `${t.x}px ${t.y}px` )
        //    .style("background-size", `${t.k*20}px ${t.k*20}px`);
        const boxes = boardDiv.selectAll(".board-box")
            .data(this.getAllBoxes, k => k.id);
        boxes.each(boxUpdateForD3Each);
    }

    updateBoxes(data) {
        const boxesToAdd = data.boxesToAdd;
        //const boxesToRemove = data.boxesToRemove;
        console.log(data);
        boxesToAdd.forEach( box => {
            this.addBox(box);
        });
        //boxesToRemove.forEach( boxId => {
        //    this.removeBox(boxId);
        //});
        boxesToAdd.forEach( box => {
            box.make();
        });
        //this.setAutoLayoutAndUpdate();
        this.update();
    }

};

let Context$1 = class Context {
    constructor() {
        this.boards = [];
        this.maxBoard = 0;
        this.sharedState = {};
    }

    get getNewBoardId() {
        let id = `board-${this.maxBoard}`;
        this.maxBoard++;
        return id;
    }

    addBoard(board) {
        const id = this.getNewBoardId;
        board.id = id;
        board.sharedStateByAncestorId.context = this.sharedState;
        board.ancestorIds.push("context");
        this.boards.push(board);
        return id;
    }

    getBoardById(id) {
        return this.boards.find( (board) => board.id == id );
    }

};

class Component{
    constructor(options){
        //this.margin = options.margin || {top:10, right:10, bottom:10, left:10};
        //this.containerClassName = options.containerClassName || "component-area";
    }

    get width() {
        return select$1(`#${this.id}`).node().clientWidth;
    }   

    get height() {
        return select$1(`#${this.id}`).node().clientHeight;
    }

    get left() {
        return select$1(`#${this.id}`).node().getBoundingClientRect().left;
    }

    get top() {
        return select$1(`#${this.id}`).node().getBoundingClientRect().top;
    }

    /*
    get containerWidth() {
        return this.width - this.margin.left - this.margin.right;
    }

    get containerHeight() {
        return this.height - this.margin.top - this.margin.bottom;
    }

    setContainerSize() {
        const container = d3.select(`#${this.parentId}`).select(`.${this.containerClassName}`);
        container
            .style("width", `${this.containerWidth}px`)
            .style("height", `${this.containerHeight}px`)
            .style("left", `${this.margin.left}px`)
            .style("top", `${this.margin.top}px`)
            .attr("width", this.containerWidth)
            .attr("height", this.containerHeight);
    }*/
}

class Context extends Context$1 {
  constructor() {
    super();
    this.models = [];
    this.maxModel = 0;
    this.sharedState.models = this.models;
  }

  getModelId() {
    const id = `model-${this.maxModel}`;
    this.maxModel++;
    return id;
  }

  addModel(model) {
    model.id = this.getModelId();
    this.models.push(model);
  }

}

class Board extends Board$1 {
    constructor(options) {
        options = options || {};
        super(options);
        this.sharedState.modelName = options.modelName || "modelName";
        this.sharedState.selectedNode = new Observable({state:{name:null}});
        this.sharedState.selectedLog = new Observable({state:{name:null, targetName:null}});
        const requestSetNodeStateData = new Observable({state:{}});
        requestSetNodeStateData.subscribe(this.setNodeStateData.bind(this));
        this.sharedState.requestSetNodeStateData = requestSetNodeStateData;
        const requestRunModelAndUpdateViews = new Observable({flag:true});
        requestRunModelAndUpdateViews.subscribe(this.runModelAndUpdateViews.bind(this));
        this.sharedState.requestRunModelAndUpdateViews = requestRunModelAndUpdateViews;
    }

    setNodeStateData(data) {
        const nodeName = data.nodeName;
        const key = data.key;
        const value = data.value;
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == this.sharedState.modelName );
        const node = model.nodes.find( node => node.name == nodeName );
        node.state[key] = value;
    }

    runModelAndUpdateViews() {
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == this.sharedState.modelName );
        model.clearLogs();
        model.run();
        this.boxes[0];
        const logViewerBox = this.boxes[1];
        logViewerBox.component.data={logs:model.logs.map(l => l.displayData)};
        logViewerBox.component.update();
    }
}

class Box extends Box$1 {
    constructor(options) {
        options = options || {};
        options.boxesSharedStateKeys = ["boxId", "name"];
        super(options);
        this.name = options.name || null;
    }
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace$1(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace$1(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array$1(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array$1(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$2(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$2(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending$1;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending$1(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace$1(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray$1(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray$1(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray$1(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection_selection() {
  return this;
}

Selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

function colors(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

var Tableau10 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb$1, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant$1 = x => () => x;

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
}

var rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero$1(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero$1(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero() {
  return 0;
}

function number$2(x) {
  return x === null ? NaN : +x;
}

const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;

function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function constants(x) {
  return function() {
    return x;
  };
}

function number$1(x) {
  return +x;
}

var unit = [0, 1];

function identity$2(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$2,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$2) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$2, rescale()) : clamp !== identity$2;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer()(identity$2, identity$2);
}

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$1(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes$1 = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes$1[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes$1[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function constant(x) {
  return function constant() {
    return x;
  };
}

const pi = Math.PI,
    tau = 2 * pi,
    epsilon$1 = 1e-6,
    tauEpsilon = tau - epsilon$1;

function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${this._x1 = +x},${this._y1 = +y}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
}

function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path(digits);
}

function array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y$1(p) {
  return p[1];
}

function line(x$1, y) {
  var defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(line);

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant(x$1);
  y = typeof y === "function" ? y : (y === undefined) ? y$1 : constant(y);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function identity(x) {
  return x;
}

var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function number(scale) {
  return d => +scale(d);
}

function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return d => +scale(d) + offset;
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + offset,
        range1 = +range[range.length - 1] + offset,
        position = (scale.bandwidth ? center : number)(scale.copy(), offset),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient === right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d) + offset); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = Array.from(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  axis.offset = function(_) {
    return arguments.length ? (offset = +_, axis) : offset;
  };

  return axis;
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}

const noop = () => {};

let _WINDOW = {};
let _DOCUMENT = {};
let _MUTATION_OBSERVER = null;
let _PERFORMANCE = {
  mark: noop,
  measure: noop
};

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

const {
  userAgent = ''
} = _WINDOW.navigator || {};
const WINDOW = _WINDOW;
const DOCUMENT = _DOCUMENT;
const MUTATION_OBSERVER = _MUTATION_OBSERVER;
const PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
const IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

var a = "classic",
    t = "duotone",
    r = "sharp",
    o = "sharp-duotone",
    c = [a, t, r, o];

var et$1 = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds"
  }
};
var bt = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
},
    Ct = ["kit"];
var Dt = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,
    Kt = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
var ao = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
};
var eo = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds"
  }
},
    lo = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds"
  }
},
    y = {
  classic: ["fas", "far", "fal", "fat"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds"]
},
    no = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid"
  }
},
    fo = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds"
  }
},
    ho = {
  classic: {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fad: "duotone",
    "fa-duotone": "duotone",
    fab: "brands",
    "fa-brands": "brands"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid"
  }
},
    x$1 = ["solid", "regular", "light", "thin", "duotone", "brands"],
    u$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    m$1 = u$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    t$1 = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
},
    yo = [...Object.keys(y), ...x$1, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", t$1.GROUP, t$1.SWAP_OPACITY, t$1.PRIMARY, t$1.SECONDARY].concat(u$1.map(o => "".concat(o, "x"))).concat(m$1.map(o => "w-".concat(o)));
var mo = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
},
    Io = {
  kit: {
    "fa-kit": "fak"
  },
  "kit-duotone": {
    "fa-kit-duotone": "fakd"
  }
},
    Fo = {
  kit: {
    fak: "fa-kit"
  },
  "kit-duotone": {
    fakd: "fa-kit-duotone"
  }
},
    So = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
};

const NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
const UNITS_IN_GRID = 16;
const DEFAULT_CSS_PREFIX = 'fa';
const DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
const DATA_FA_I2SVG = 'data-fa-i2svg';
const DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
const DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
const DATA_PREFIX = 'data-prefix';
const DATA_ICON = 'data-icon';
const HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
const MUTATION_APPROACH_ASYNC = 'async';
const TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
const PRODUCTION = (() => {
  try {
    return "development" === 'production';
  } catch (e$$1) {
    return false;
  }
})();
const FAMILIES = [a, r, o];

function familyProxy(obj) {
  // Defaults to the classic family if family is not available
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : target[a];
    }

  });
}

const _PREFIX_TO_STYLE = { ...ho
};
_PREFIX_TO_STYLE[a] = { ...ho[a],
  ...bt['kit'],
  ...bt['kit-duotone']
};
const PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
const _STYLE_TO_PREFIX = { ...fo
};
_STYLE_TO_PREFIX[a] = { ..._STYLE_TO_PREFIX[a],
  ...So['kit'],
  ...So['kit-duotone']
};
const STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
const _PREFIX_TO_LONG_STYLE = { ...no
};
_PREFIX_TO_LONG_STYLE[a] = { ..._PREFIX_TO_LONG_STYLE[a],
  ...Fo['kit']
};
const PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
const _LONG_STYLE_TO_PREFIX = { ...lo
};
_LONG_STYLE_TO_PREFIX[a] = { ..._LONG_STYLE_TO_PREFIX[a],
  ...Io['kit']
};
const LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
const ICON_SELECTION_SYNTAX_PATTERN = Dt; // eslint-disable-line no-useless-escape

const LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
const FONT_FAMILY_PATTERN = Kt;
const _FONT_WEIGHT_TO_PREFIX = { ...et$1
};
familyProxy(_FONT_WEIGHT_TO_PREFIX);
const ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
const DUOTONE_CLASSES = t$1;
const prefixes = new Set();
Object.keys(STYLE_TO_PREFIX[a]).map(prefixes.add.bind(prefixes));
Object.keys(STYLE_TO_PREFIX[r]).map(prefixes.add.bind(prefixes));
Object.keys(STYLE_TO_PREFIX[o]).map(prefixes.add.bind(prefixes));
const RESERVED_CLASSES = [...Ct, ...yo];

const initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  const attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(_ref => {
    let [attr, key] = _ref;
    const val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

const _default = {
  styleDefault: 'solid',
  familyDefault: 'classic',
  cssPrefix: DEFAULT_CSS_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
}; // familyPrefix is deprecated but we must still support it if present

if (initial.familyPrefix) {
  initial.cssPrefix = initial.familyPrefix;
}

const _config = { ..._default,
  ...initial
};
if (!_config.autoReplaceSvg) _config.observeMutations = false;
const config = {};
Object.keys(_default).forEach(key => {
  Object.defineProperty(config, key, {
    enumerable: true,
    set: function (val) {
      _config[key] = val;

      _onChangeCb.forEach(cb => cb(config));
    },
    get: function () {
      return _config[key];
    }
  });
}); // familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0

Object.defineProperty(config, 'familyPrefix', {
  enumerable: true,
  set: function (val) {
    _config.cssPrefix = val;

    _onChangeCb.forEach(cb => cb(config));
  },
  get: function () {
    return _config.cssPrefix;
  }
});
WINDOW.FontAwesomeConfig = config;
const _onChangeCb = [];
function onChange(cb) {
  _onChangeCb.push(cb);

  return () => {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}

const d$2 = UNITS_IN_GRID;
const meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};
function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }

  const style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  const headChildren = DOCUMENT.head.childNodes;
  let beforeChild = null;

  for (let i = headChildren.length - 1; i > -1; i--) {
    const child = headChildren[i];
    const tagName = (child.tagName || '').toUpperCase();

    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  DOCUMENT.head.insertBefore(style, beforeChild);
  return css;
}
const idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function nextUniqueId() {
  let size = 12;
  let id = '';

  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }

  return id;
}
function toArray(obj) {
  const array = [];

  for (let i = (obj || []).length >>> 0; i--;) {
    array[i] = obj[i];
  }

  return array;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute('class') || '').split(' ').filter(i => i);
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce((acc, attributeName) => {
    return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
  }, '').trim();
}
function joinStyles(styles) {
  return Object.keys(styles || {}).reduce((acc, styleName) => {
    return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
  }, '');
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
  let {
    transform,
    containerWidth,
    iconWidth
  } = _ref;
  const outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  const inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  const path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer,
    inner,
    path
  };
}
function transformForCss(_ref2) {
  let {
    transform,
    width = UNITS_IN_GRID,
    height = UNITS_IN_GRID,
    startCentered = false
  } = _ref2;
  let val = '';

  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
  }

  val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}

var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-regular: normal 400 1em/1 \"Font Awesome 6 Free\";\n  --fa-font-light: normal 300 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-thin: normal 100 1em/1 \"Font Awesome 6 Pro\";\n  --fa-font-duotone: normal 900 1em/1 \"Font Awesome 6 Duotone\";\n  --fa-font-brands: normal 400 1em/1 \"Font Awesome 6 Brands\";\n  --fa-font-sharp-solid: normal 900 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-regular: normal 400 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-light: normal 300 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-thin: normal 100 1em/1 \"Font Awesome 6 Sharp\";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 \"Font Awesome 6 Sharp Duotone\";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}";

function css() {
  const dcp = DEFAULT_CSS_PREFIX;
  const drc = DEFAULT_REPLACEMENT_CLASS;
  const fp = config.cssPrefix;
  const rc = config.replacementClass;
  let s = baseStyles;

  if (fp !== dcp || rc !== drc) {
    const dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
    const customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
    const rPatt = new RegExp("\\.".concat(drc), 'g');
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }

  return s;
}

let _cssInserted = false;

function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}

var InjectCSS = {
  mixout() {
    return {
      dom: {
        css,
        insertCss: ensureCss
      }
    };
  },

  hooks() {
    return {
      beforeDOMElementCreation() {
        ensureCss();
      },

      beforeI2svg() {
        ensureCss();
      }

    };
  }

};

const w$1 = WINDOW || {};
if (!w$1[NAMESPACE_IDENTIFIER]) w$1[NAMESPACE_IDENTIFIER] = {};
if (!w$1[NAMESPACE_IDENTIFIER].styles) w$1[NAMESPACE_IDENTIFIER].styles = {};
if (!w$1[NAMESPACE_IDENTIFIER].hooks) w$1[NAMESPACE_IDENTIFIER].hooks = {};
if (!w$1[NAMESPACE_IDENTIFIER].shims) w$1[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w$1[NAMESPACE_IDENTIFIER];

const functions = [];

const listener = function () {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(fn => fn());
};

let loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

function domready (fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}

function toHtml(abstractNodes) {
  const {
    tag,
    attributes = {},
    children = []
  } = abstractNodes;

  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
  }
}

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix,
      iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */

var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */


var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

/**
 * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
 *
 * Copyright Mathias Bynens <https://mathiasbynens.be/>

 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;

  while (counter < length) {
    const value = string.charCodeAt(counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      const extra = string.charCodeAt(counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // eslint-disable-line eqeqeq
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
}

function toHex(unicode) {
  const decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index) {
  const size = string.length;
  let first = string.charCodeAt(index);
  let second;

  if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
    second = string.charCodeAt(index + 1);

    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }

  return first;
}

function normalizeIcons(icons) {
  return Object.keys(icons).reduce((acc, iconName) => {
    const icon = icons[iconName];
    const expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }

    return acc;
  }, {});
}

function defineIcons(prefix, icons) {
  let params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    skipHooks = false
  } = params;
  const normalized = normalizeIcons(icons);

  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = { ...(namespace.styles[prefix] || {}),
      ...normalized
    };
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll ease the upgrade process for our users by automatically defining
   * this as well.
   */


  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}

const {
  styles,
  shims
} = namespace;
const LONG_STYLE = {
  [a]: Object.values(PREFIX_TO_LONG_STYLE[a]),
  [r]: Object.values(PREFIX_TO_LONG_STYLE[r]),
  [o]: Object.values(PREFIX_TO_LONG_STYLE[o])
};
let _defaultUsablePrefix = null;
let _byUnicode = {};
let _byLigature = {};
let _byOldName = {};
let _byOldUnicode = {};
let _byAlias = {};
const PREFIXES = {
  [a]: Object.keys(PREFIX_TO_STYLE[a]),
  [r]: Object.keys(PREFIX_TO_STYLE[r]),
  [o]: Object.keys(PREFIX_TO_STYLE[o])
};

function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}

function getIconName(cssPrefix, cls) {
  const parts = cls.split('-');
  const prefix = parts[0];
  const iconName = parts.slice(1).join('-');

  if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
const build = () => {
  const lookup = reducer => {
    return reduce(styles, (o$$1, style, prefix) => {
      o$$1[prefix] = reduce(style, reducer, {});
      return o$$1;
    }, {});
  };

  _byUnicode = lookup((acc, icon, iconName) => {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }

    if (icon[2]) {
      const aliases = icon[2].filter(a$$1 => {
        return typeof a$$1 === 'number';
      });
      aliases.forEach(alias => {
        acc[alias.toString(16)] = iconName;
      });
    }

    return acc;
  });
  _byLigature = lookup((acc, icon, iconName) => {
    acc[iconName] = iconName;

    if (icon[2]) {
      const aliases = icon[2].filter(a$$1 => {
        return typeof a$$1 === 'string';
      });
      aliases.forEach(alias => {
        acc[alias] = iconName;
      });
    }

    return acc;
  });
  _byAlias = lookup((acc, icon, iconName) => {
    const aliases = icon[2];
    acc[iconName] = iconName;
    aliases.forEach(alias => {
      acc[alias] = iconName;
    });
    return acc;
  }); // If we have a Kit, we can't determine if regular is available since we
  // could be auto-fetching it. We'll have to assume that it is available.

  const hasRegular = 'far' in styles || config.autoFetchSvg;
  const shimLookups = reduce(shims, (acc, shim) => {
    const maybeNameMaybeUnicode = shim[0];
    let prefix = shim[1];
    const iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    if (typeof maybeNameMaybeUnicode === 'string') {
      acc.names[maybeNameMaybeUnicode] = {
        prefix,
        iconName
      };
    }

    if (typeof maybeNameMaybeUnicode === 'number') {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix,
        iconName
      };
    }

    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
    family: config.familyDefault
  });
};
onChange(c$$1 => {
  _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
    family: config.familyDefault
  });
});
build();
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  const oldUnicode = _byOldUnicode[unicode];
  const newUnicode = byUnicode('fas', unicode);
  return oldUnicode || (newUnicode ? {
    prefix: 'fas',
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
const emptyCanonicalIcon = () => {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function getCanonicalPrefix(styleOrPrefix) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    family = a
  } = params;
  const style = PREFIX_TO_STYLE[family][styleOrPrefix];
  const prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
  const defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  const result = prefix || defined || null;
  return result;
}
const PREFIXES_FOR_FAMILY = {
  [a]: Object.keys(PREFIX_TO_LONG_STYLE[a]),
  [r]: Object.keys(PREFIX_TO_LONG_STYLE[r]),
  [o]: Object.keys(PREFIX_TO_LONG_STYLE[o])
};
function getCanonicalIcon(values) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    skipLookups = false
  } = params;
  const famProps = {
    [a]: "".concat(config.cssPrefix, "-").concat(a),
    [r]: "".concat(config.cssPrefix, "-").concat(r),
    [o]: "".concat(config.cssPrefix, "-").concat(o)
  };
  let givenPrefix = null;
  let family = a;
  const nonDuotoneFamilyIds = c.filter(familyId => familyId !== t);
  nonDuotoneFamilyIds.forEach(familyId => {
    if (values.includes(famProps[familyId]) || values.some(v$$1 => PREFIXES_FOR_FAMILY[familyId].includes(v$$1))) {
      family = familyId;
    }
  });
  const canonical = values.reduce((acc, cls) => {
    const iconName = getIconName(config.cssPrefix, cls);

    if (styles[cls]) {
      cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
      givenPrefix = cls;
      acc.prefix = cls;
    } else if (PREFIXES[family].indexOf(cls) > -1) {
      givenPrefix = cls;
      acc.prefix = getCanonicalPrefix(cls, {
        family
      });
    } else if (iconName) {
      acc.iconName = iconName;
    } else if (cls !== config.replacementClass && !nonDuotoneFamilyIds.some(familyName => cls === famProps[familyName])) {
      acc.rest.push(cls);
    }

    if (!skipLookups && acc.prefix && acc.iconName) {
      const shim = givenPrefix === 'fa' ? byOldName(acc.iconName) : {};
      const aliasIconName = byAlias(acc.prefix, acc.iconName);

      if (shim.prefix) {
        givenPrefix = null;
      }

      acc.iconName = shim.iconName || aliasIconName || acc.iconName;
      acc.prefix = shim.prefix || acc.prefix;

      if (acc.prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
        // Allow a fallback from the regular style to solid if regular is not available
        // but only if we aren't auto-fetching SVGs
        acc.prefix = 'fas';
      }
    }

    return acc;
  }, emptyCanonicalIcon());

  if (values.includes('fa-brands') || values.includes('fab')) {
    canonical.prefix = 'fab';
  }

  if (values.includes('fa-duotone') || values.includes('fad')) {
    canonical.prefix = 'fad';
  }

  if (!canonical.prefix && family === r && (styles['fass'] || config.autoFetchSvg)) {
    canonical.prefix = 'fass';
    canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
  }

  if (!canonical.prefix && family === o && (styles['fasds'] || config.autoFetchSvg)) {
    canonical.prefix = 'fasds';
    canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
  }

  if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
    // The fa prefix is not canonical. So if it has made it through until this point
    // we will shift it to the correct prefix.
    canonical.prefix = getDefaultUsablePrefix() || 'fas';
  }

  return canonical;
}

class Library {
  constructor() {
    this.definitions = {};
  }

  add() {
    for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
      definitions[_key] = arguments[_key];
    }

    const additions = definitions.reduce(this._pullDefinitions, {});
    Object.keys(additions).forEach(key => {
      this.definitions[key] = { ...(this.definitions[key] || {}),
        ...additions[key]
      };
      defineIcons(key, additions[key]); // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change

      const longPrefix = PREFIX_TO_LONG_STYLE[a][key];
      if (longPrefix) defineIcons(longPrefix, additions[key]);
      build();
    });
  }

  reset() {
    this.definitions = {};
  }

  _pullDefinitions(additions, definition) {
    const normalized = definition.prefix && definition.iconName && definition.icon ? {
      0: definition
    } : definition;
    Object.keys(normalized).map(key => {
      const {
        prefix,
        iconName,
        icon
      } = normalized[key];
      const aliases = icon[2];
      if (!additions[prefix]) additions[prefix] = {};

      if (aliases.length > 0) {
        aliases.forEach(alias => {
          if (typeof alias === 'string') {
            additions[prefix][alias] = icon;
          }
        });
      }

      additions[prefix][iconName] = icon;
    });
    return additions;
  }

}

let _plugins = [];
let _hooks = {};
const providers = {};
const defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref) {
  let {
    mixoutsTo: obj
  } = _ref;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach(k => {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });

  _plugins.forEach(plugin => {
    const mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach(tk => {
      if (typeof mixout[tk] === 'function') {
        obj[tk] = mixout[tk];
      }

      if (typeof mixout[tk] === 'object') {
        Object.keys(mixout[tk]).forEach(sk => {
          if (!obj[tk]) {
            obj[tk] = {};
          }

          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });

    if (plugin.hooks) {
      const hooks = plugin.hooks();
      Object.keys(hooks).forEach(hook => {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }

        _hooks[hook].push(hooks[hook]);
      });
    }

    if (plugin.provides) {
      plugin.provides(providers);
    }
  });

  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  const hookFns = _hooks[hook] || [];
  hookFns.forEach(hookFn => {
    accumulator = hookFn.apply(null, [accumulator, ...args]); // eslint-disable-line no-useless-call
  });
  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  const hookFns = _hooks[hook] || [];
  hookFns.forEach(hookFn => {
    hookFn.apply(null, args);
  });
  return undefined;
}
function callProvided() {
  const hook = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : undefined;
}

function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === 'fa') {
    iconLookup.prefix = 'fas';
  }

  let {
    iconName
  } = iconLookup;
  const prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
const library = new Library();
const noAuto = () => {
  config.autoReplaceSvg = false;
  config.observeMutations = false;
  callHooks('noAuto');
};
const dom = {
  i2svg: function () {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (IS_DOM) {
      callHooks('beforeI2svg', params);
      callProvided('pseudoElements2svg', params);
      return callProvided('i2svg', params);
    } else {
      return Promise.reject(new Error('Operation requires a DOM of some kind.'));
    }
  },
  watch: function () {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      autoReplaceSvgRoot
    } = params;

    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }

    config.observeMutations = true;
    domready(() => {
      autoReplace({
        autoReplaceSvgRoot
      });
      callHooks('watch', params);
    });
  }
};
const parse = {
  icon: icon => {
    if (icon === null) {
      return null;
    }

    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
      return {
        prefix: icon.prefix,
        iconName: byAlias(icon.prefix, icon.iconName) || icon.iconName
      };
    }

    if (Array.isArray(icon) && icon.length === 2) {
      const iconName = icon[1].indexOf('fa-') === 0 ? icon[1].slice(3) : icon[1];
      const prefix = getCanonicalPrefix(icon[0]);
      return {
        prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }

    if (typeof icon === 'string' && (icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      const canonicalIcon = getCanonicalIcon(icon.split(' '), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }

    if (typeof icon === 'string') {
      const prefix = getDefaultUsablePrefix();
      return {
        prefix,
        iconName: byAlias(prefix, icon) || icon
      };
    }
  }
};
const api = {
  noAuto,
  config,
  dom,
  parse,
  library,
  findIconDefinition,
  toHtml
};

const autoReplace = function () {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    autoReplaceSvgRoot = DOCUMENT
  } = params;
  if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
    node: autoReplaceSvgRoot
  });
};

function domVariants(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });
  Object.defineProperty(val, 'html', {
    get: function () {
      return val.abstract.map(a => toHtml(a));
    }
  });
  Object.defineProperty(val, 'node', {
    get: function () {
      if (!IS_DOM) return;
      const container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}

function asIcon (_ref) {
  let {
    children,
    main,
    mask,
    attributes,
    styles,
    transform
  } = _ref;

  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    const {
      width,
      height
    } = main;
    const offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles({ ...styles,
      'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    });
  }

  return [{
    tag: 'svg',
    attributes,
    children
  }];
}

function asSymbol (_ref) {
  let {
    prefix,
    iconName,
    children,
    attributes,
    symbol
  } = _ref;
  const id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: { ...attributes,
        id
      },
      children
    }]
  }];
}

function makeInlineSvgAbstract(params) {
  const {
    icons: {
      main,
      mask
    },
    prefix,
    iconName,
    transform,
    symbol,
    title,
    maskId,
    titleId,
    extra,
    watchable = false
  } = params;
  const {
    width,
    height
  } = mask.found ? mask : main;
  const isUploadedIcon = prefix === 'fak';
  const attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(c => extra.classes.indexOf(c) === -1).filter(c => c !== '' || !!c).concat(extra.classes).join(' ');
  let content = {
    children: [],
    attributes: { ...extra.attributes,
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': extra.attributes.role || 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': "0 0 ".concat(width, " ").concat(height)
    }
  };
  const uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};

  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }

  if (title) {
    content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }

  const args = { ...content,
    prefix,
    iconName,
    main,
    mask,
    maskId,
    transform,
    symbol,
    styles: { ...uploadedIconWidthStyle,
      ...extra.styles
    }
  };
  const {
    children,
    attributes
  } = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
    children: [],
    attributes: {}
  } : callProvided('generateAbstractIcon', args) || {
    children: [],
    attributes: {}
  };
  args.children = children;
  args.attributes = attributes;

  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  const {
    content,
    width,
    height,
    transform,
    title,
    extra,
    watchable = false
  } = params;
  const attributes = { ...extra.attributes,
    ...(title ? {
      'title': title
    } : {}),
    'class': extra.classes.join(' ')
  };

  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }

  const styles = { ...extra.styles
  };

  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({
      transform,
      startCentered: true,
      width,
      height
    });
    styles['-webkit-transform'] = styles['transform'];
  }

  const styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  const val = [];
  val.push({
    tag: 'span',
    attributes,
    children: [content]
  });

  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }

  return val;
}
function makeLayersCounterAbstract(params) {
  const {
    content,
    title,
    extra
  } = params;
  const attributes = { ...extra.attributes,
    ...(title ? {
      'title': title
    } : {}),
    'class': extra.classes.join(' ')
  };
  const styleString = joinStyles(extra.styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  const val = [];
  val.push({
    tag: 'span',
    attributes,
    children: [content]
  });

  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }

  return val;
}

const {
  styles: styles$1
} = namespace;
function asFoundIcon(icon) {
  const width = icon[0];
  const height = icon[1];
  const [vectorData] = icon.slice(4);
  let element = null;

  if (Array.isArray(vectorData)) {
    element = {
      tag: 'g',
      attributes: {
        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: 'currentColor',
          d: vectorData[0]
        }
      }, {
        tag: 'path',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: 'currentColor',
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: 'path',
      attributes: {
        fill: 'currentColor',
        d: vectorData
      }
    };
  }

  return {
    found: true,
    width,
    height,
    icon: element
  };
}
const missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};

function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION && !config.showMissingIcons && iconName) {
    console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
  }
}

function findIcon(iconName, prefix) {
  let givenPrefix = prefix;

  if (prefix === 'fa' && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }

  return new Promise((resolve, reject) => {
    if (givenPrefix === 'fa') {
      const shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }

    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      const icon = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon));
    }

    maybeNotifyMissing(iconName, prefix);
    resolve({ ...missingIconResolutionMixin,
      icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
    });
  });
}

const noop$1 = () => {};

const p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
const preamble = "FA \"6.6.0\"";

const begin = name => {
  p$2.mark("".concat(preamble, " ").concat(name, " begins"));
  return () => end(name);
};

const end = name => {
  p$2.mark("".concat(preamble, " ").concat(name, " ends"));
  p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};

var perf = {
  begin,
  end
};

const noop$2 = () => {};

function isWatched(node) {
  const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === 'string';
}

function hasPrefixAndIcon(node) {
  const prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  const icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon;
}

function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}

function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }

  const mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}

function createElementNS(tag) {
  return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
}

function createElement(tag) {
  return DOCUMENT.createElement(tag);
}

function convertSVG(abstractObj) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    ceFn = abstractObj.tag === 'svg' ? createElementNS : createElement
  } = params;

  if (typeof abstractObj === 'string') {
    return DOCUMENT.createTextNode(abstractObj);
  }

  const tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function (key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  const children = abstractObj.children || [];
  children.forEach(function (child) {
    tag.appendChild(convertSVG(child, {
      ceFn
    }));
  });
  return tag;
}

function nodeAsComment(node) {
  let comment = " ".concat(node.outerHTML, " ");
  /* BEGIN.ATTRIBUTION */

  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  /* END.ATTRIBUTION */

  return comment;
}

const mutators = {
  replace: function (mutation) {
    const node = mutation[0];

    if (node.parentNode) {
      mutation[1].forEach(abstract => {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });

      if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
        let comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function (mutation) {
    const node = mutation[0];
    const abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
    // Short-circuit to the standard replacement

    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }

    const forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
    delete abstract[0].attributes.id;

    if (abstract[0].attributes.class) {
      const splitClasses = abstract[0].attributes.class.split(' ').reduce((acc, cls) => {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }

        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');

      if (splitClasses.toNode.length === 0) {
        node.removeAttribute('class');
      } else {
        node.setAttribute('class', splitClasses.toNode.join(' '));
      }
    }

    const newInnerHTML = abstract.map(a => toHtml(a)).join('\n');
    node.setAttribute(DATA_FA_I2SVG, '');
    node.innerHTML = newInnerHTML;
  }
};

function performOperationSync(op) {
  op();
}

function perform(mutations, callback) {
  const callbackFunction = typeof callback === 'function' ? callback : noop$2;

  if (mutations.length === 0) {
    callbackFunction();
  } else {
    let frame = performOperationSync;

    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }

    frame(() => {
      const mutator = getMutator();
      const mark = perf.begin('mutate');
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
let disabled = false;
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
let mo$1 = null;
function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }

  if (!config.observeMutations) {
    return;
  }

  const {
    treeCallback = noop$2,
    nodeCallback = noop$2,
    pseudoElementsCallback = noop$2,
    observeMutationsRoot = DOCUMENT
  } = options;
  mo$1 = new MUTATION_OBSERVER(objects => {
    if (disabled) return;
    const defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach(mutationRecord => {
      if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }

        treeCallback(mutationRecord.target);
      }

      if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }

      if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
          const {
            prefix,
            iconName
          } = getCanonicalIcon(classArray(mutationRecord.target));
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo$1.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo$1) return;
  mo$1.disconnect();
}

function styleParser (node) {
  const style = node.getAttribute('style');
  let val = [];

  if (style) {
    val = style.split(';').reduce((acc, style) => {
      const styles = style.split(':');
      const prop = styles[0];
      const value = styles.slice(1);

      if (prop && value.length > 0) {
        acc[prop] = value.join(':').trim();
      }

      return acc;
    }, {});
  }

  return val;
}

function classParser (node) {
  const existingPrefix = node.getAttribute('data-prefix');
  const existingIconName = node.getAttribute('data-icon');
  const innerText = node.innerText !== undefined ? node.innerText.trim() : '';
  let val = getCanonicalIcon(classArray(node));

  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }

  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }

  if (val.iconName && val.prefix) {
    return val;
  }

  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }

  if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
    val.iconName = node.firstChild.data;
  }

  return val;
}

function attributesParser (node) {
  const extraAttributes = toArray(node.attributes).reduce((acc, attr) => {
    if (acc.name !== 'class' && acc.name !== 'style') {
      acc[attr.name] = attr.value;
    }

    return acc;
  }, {});
  const title = node.getAttribute('title');
  const titleId = node.getAttribute('data-fa-title-id');

  if (config.autoA11y) {
    if (title) {
      extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes['aria-hidden'] = 'true';
      extraAttributes['focusable'] = 'false';
    }
  }

  return extraAttributes;
}

function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  let parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    styleParser: true
  };
  const {
    iconName,
    prefix,
    rest: extraClasses
  } = classParser(node);
  const extraAttributes = attributesParser(node);
  const pluginMeta = chainHooks('parseNodeAttributes', {}, node);
  let extraStyles = parser.styleParser ? styleParser(node) : [];
  return {
    iconName,
    title: node.getAttribute('title'),
    titleId: node.getAttribute('data-fa-title-id'),
    prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    },
    ...pluginMeta
  };
}

const {
  styles: styles$2
} = namespace;

function generateMutation(node) {
  const nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);

  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided('generateLayersText', node, nodeMeta);
  } else {
    return callProvided('generateSvgReplacementMutation', node, nodeMeta);
  }
}

let knownPrefixes = new Set();
FAMILIES.map(family => {
  knownPrefixes.add("fa-".concat(family));
});
Object.keys(PREFIX_TO_STYLE[a]).map(knownPrefixes.add.bind(knownPrefixes));
Object.keys(PREFIX_TO_STYLE[r]).map(knownPrefixes.add.bind(knownPrefixes));
Object.keys(PREFIX_TO_STYLE[o]).map(knownPrefixes.add.bind(knownPrefixes));
knownPrefixes = [...knownPrefixes];

function onTree(root) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  const htmlClassList = DOCUMENT.documentElement.classList;

  const hclAdd = suffix => htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));

  const hclRemove = suffix => htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));

  const prefixes = config.autoFetchSvg ? knownPrefixes : FAMILIES.map(f$$1 => "fa-".concat(f$$1)).concat(Object.keys(styles$2));

  if (!prefixes.includes('fa')) {
    prefixes.push('fa');
  }

  const prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(p$$1 => ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])"))).join(', ');

  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }

  let candidates = [];

  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e$$1) {// noop
  }

  if (candidates.length > 0) {
    hclAdd('pending');
    hclRemove('complete');
  } else {
    return Promise.resolve();
  }

  const mark = perf.begin('onTree');
  const mutations = candidates.reduce((acc, node) => {
    try {
      const mutation = generateMutation(node);

      if (mutation) {
        acc.push(mutation);
      }
    } catch (e$$1) {
      if (!PRODUCTION) {
        if (e$$1.name === 'MissingIcon') {
          console.error(e$$1);
        }
      }
    }

    return acc;
  }, []);
  return new Promise((resolve, reject) => {
    Promise.all(mutations).then(resolvedMutations => {
      perform(resolvedMutations, () => {
        hclAdd('active');
        hclAdd('complete');
        hclRemove('pending');
        if (typeof callback === 'function') callback();
        mark();
        resolve();
      });
    }).catch(e$$1 => {
      mark();
      reject(e$$1);
    });
  });
}

function onNode(node) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  generateMutation(node).then(mutation => {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}

function resolveIcons(next) {
  return function (maybeIconDefinition) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    let {
      mask
    } = params;

    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, { ...params,
      mask
    });
  };
}

const render = function (iconDefinition) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    transform = meaninglessTransform,
    symbol = false,
    mask = null,
    maskId = null,
    title = null,
    titleId = null,
    classes = [],
    attributes = {},
    styles = {}
  } = params;
  if (!iconDefinition) return;
  const {
    prefix,
    iconName,
    icon
  } = iconDefinition;
  return domVariants({
    type: 'icon',
    ...iconDefinition
  }, () => {
    callHooks('beforeDOMElementCreation', {
      iconDefinition,
      params
    });

    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes['aria-hidden'] = 'true';
        attributes['focusable'] = 'false';
      }
    }

    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix,
      iconName,
      transform: { ...meaninglessTransform,
        ...transform
      },
      symbol,
      title,
      maskId,
      titleId,
      extra: {
        attributes,
        styles,
        classes
      }
    });
  });
};
var ReplaceElements = {
  mixout() {
    return {
      icon: resolveIcons(render)
    };
  },

  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }

    };
  },

  provides(providers$$1) {
    providers$$1.i2svg = function (params) {
      const {
        node = DOCUMENT,
        callback = () => {}
      } = params;
      return onTree(node, callback);
    };

    providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
      const {
        iconName,
        title,
        titleId,
        prefix,
        transform,
        symbol,
        mask,
        maskId,
        extra
      } = nodeMeta;
      return new Promise((resolve, reject) => {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then(_ref => {
          let [main, mask] = _ref;
          resolve([node, makeInlineSvgAbstract({
            icons: {
              main,
              mask
            },
            prefix,
            iconName,
            transform,
            symbol,
            maskId,
            title,
            titleId,
            extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };

    providers$$1.generateAbstractIcon = function (_ref2) {
      let {
        children,
        attributes,
        main,
        transform,
        styles
      } = _ref2;
      const styleString = joinStyles(styles);

      if (styleString.length > 0) {
        attributes['style'] = styleString;
      }

      let nextChild;

      if (transformIsMeaningful(transform)) {
        nextChild = callProvided('generateAbstractTransformGrouping', {
          main,
          transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }

      children.push(nextChild || main.icon);
      return {
        children,
        attributes
      };
    };
  }

};

var Layers = {
  mixout() {
    return {
      layer(assembler) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          classes = []
        } = params;
        return domVariants({
          type: 'layer'
        }, () => {
          callHooks('beforeDOMElementCreation', {
            assembler,
            params
          });
          let children = [];
          assembler(args => {
            Array.isArray(args) ? args.map(a => {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: 'span',
            attributes: {
              class: ["".concat(config.cssPrefix, "-layers"), ...classes].join(' ')
            },
            children
          }];
        });
      }

    };
  }

};

var LayersCounter = {
  mixout() {
    return {
      counter(content) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          title = null,
          classes = [],
          attributes = {},
          styles = {}
        } = params;
        return domVariants({
          type: 'counter',
          content
        }, () => {
          callHooks('beforeDOMElementCreation', {
            content,
            params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title,
            extra: {
              attributes,
              styles,
              classes: ["".concat(config.cssPrefix, "-layers-counter"), ...classes]
            }
          });
        });
      }

    };
  }

};

var LayersText = {
  mixout() {
    return {
      text(content) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
          transform = meaninglessTransform,
          title = null,
          classes = [],
          attributes = {},
          styles = {}
        } = params;
        return domVariants({
          type: 'text',
          content
        }, () => {
          callHooks('beforeDOMElementCreation', {
            content,
            params
          });
          return makeLayersTextAbstract({
            content,
            transform: { ...meaninglessTransform,
              ...transform
            },
            title,
            extra: {
              attributes,
              styles,
              classes: ["".concat(config.cssPrefix, "-layers-text"), ...classes]
            }
          });
        });
      }

    };
  },

  provides(providers$$1) {
    providers$$1.generateLayersText = function (node, nodeMeta) {
      const {
        title,
        transform,
        extra
      } = nodeMeta;
      let width = null;
      let height = null;

      if (IS_IE) {
        const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        const boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }

      if (config.autoA11y && !title) {
        extra.attributes['aria-hidden'] = 'true';
      }

      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width,
        height,
        transform,
        title,
        extra,
        watchable: true
      })]);
    };
  }

};

const CLEAN_CONTENT_PATTERN = new RegExp('\u{22}', 'ug');
const SECONDARY_UNICODE_RANGE = [1105920, 1112319];
const _FONT_FAMILY_WEIGHT_TO_PREFIX = { ...{
    FontAwesome: {
      normal: 'fas',
      400: 'fas'
    }
  },
  ...eo,
  ...ao,
  ...mo
};
const FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, key) => {
  acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
  return acc;
}, {});
const FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, fontFamily) => {
  const weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
  acc[fontFamily] = weights[900] || [...Object.entries(weights)][0][1];
  return acc;
}, {});
function hexValueFromContent(content) {
  const cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
  const codePoint = codePointAt(cleaned, 0);
  const isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  const isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function getPrefix(fontFamily, fontWeight) {
  const fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, '').toLowerCase();
  const fontWeightInteger = parseInt(fontWeight);
  const fontWeightSanitized = isNaN(fontWeightInteger) ? 'normal' : fontWeightInteger;
  return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
}

function replaceForPosition(node, position) {
  const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
  return new Promise((resolve, reject) => {
    if (node.getAttribute(pendingAttribute) !== null) {
      // This node is already being processed
      return resolve();
    }

    const children = toArray(node.children);
    const alreadyProcessedPseudoElement = children.filter(c => c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position)[0];
    const styles = WINDOW.getComputedStyle(node, position);
    const fontFamily = styles.getPropertyValue('font-family');
    const fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
    const fontWeight = styles.getPropertyValue('font-weight');
    const content = styles.getPropertyValue('content');

    if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
      // If we've already processed it but the current computed style does not result in a font-family,
      // that probably means that a class name that was previously present to make the icon has been
      // removed. So we now should delete the icon.
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamilyMatch && content !== 'none' && content !== '') {
      const content = styles.getPropertyValue('content');
      let prefix = getPrefix(fontFamily, fontWeight);
      const {
        value: hexValue,
        isSecondary
      } = hexValueFromContent(content);
      const isV4 = fontFamilyMatch[0].startsWith('FontAwesome');
      let iconName = byUnicode(prefix, hexValue);
      let iconIdentifier = iconName;

      if (isV4) {
        const iconName4 = byOldUnicode(hexValue);

        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      } // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
      // already done so with the same prefix and iconName


      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);

        if (alreadyProcessedPseudoElement) {
          // Delete the old one, since we're replacing it with a new one
          node.removeChild(alreadyProcessedPseudoElement);
        }

        const meta = blankMeta();
        const {
          extra
        } = meta;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then(main => {
          const abstract = makeInlineSvgAbstract({ ...meta,
            icons: {
              main,
              mask: emptyCanonicalIcon()
            },
            prefix,
            iconName: iconIdentifier,
            extra,
            watchable: true
          });
          const element = DOCUMENT.createElementNS('http://www.w3.org/2000/svg', 'svg');

          if (position === '::before') {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }

          element.outerHTML = abstract.map(a => toHtml(a)).join('\n');
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}

function replace(node) {
  return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
}

function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}

function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise((resolve, reject) => {
    const operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
    const end = perf.begin('searchPseudoElements');
    disableObservation();
    Promise.all(operations).then(() => {
      end();
      enableObservation();
      resolve();
    }).catch(() => {
      end();
      enableObservation();
      reject();
    });
  });
}

var PseudoElements = {
  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }

    };
  },

  provides(providers) {
    providers.pseudoElements2svg = function (params) {
      const {
        node = DOCUMENT
      } = params;

      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }

};

let _unwatched = false;
var MutationObserver$1 = {
  mixout() {
    return {
      dom: {
        unwatch() {
          disableObservation();
          _unwatched = true;
        }

      }
    };
  },

  hooks() {
    return {
      bootstrap() {
        observe(chainHooks('mutationObserverCallbacks', {}));
      },

      noAuto() {
        disconnect();
      },

      watch(params) {
        const {
          observeMutationsRoot
        } = params;

        if (_unwatched) {
          enableObservation();
        } else {
          observe(chainHooks('mutationObserverCallbacks', {
            observeMutationsRoot
          }));
        }
      }

    };
  }

};

const parseTransformString = transformString => {
  let transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(' ').reduce((acc, n) => {
    const parts = n.toLowerCase().split('-');
    const first = parts[0];
    let rest = parts.slice(1).join('-');

    if (first && rest === 'h') {
      acc.flipX = true;
      return acc;
    }

    if (first && rest === 'v') {
      acc.flipY = true;
      return acc;
    }

    rest = parseFloat(rest);

    if (isNaN(rest)) {
      return acc;
    }

    switch (first) {
      case 'grow':
        acc.size = acc.size + rest;
        break;

      case 'shrink':
        acc.size = acc.size - rest;
        break;

      case 'left':
        acc.x = acc.x - rest;
        break;

      case 'right':
        acc.x = acc.x + rest;
        break;

      case 'up':
        acc.y = acc.y - rest;
        break;

      case 'down':
        acc.y = acc.y + rest;
        break;

      case 'rotate':
        acc.rotate = acc.rotate + rest;
        break;
    }

    return acc;
  }, transform);
};
var PowerTransforms = {
  mixout() {
    return {
      parse: {
        transform: transformString => {
          return parseTransformString(transformString);
        }
      }
    };
  },

  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const transformString = node.getAttribute('data-fa-transform');

        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }

        return accumulator;
      }

    };
  },

  provides(providers) {
    providers.generateAbstractTransformGrouping = function (_ref) {
      let {
        main,
        transform,
        containerWidth,
        iconWidth
      } = _ref;
      const outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      const inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      const path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      const operations = {
        outer,
        inner,
        path
      };
      return {
        tag: 'g',
        attributes: { ...operations.outer
        },
        children: [{
          tag: 'g',
          attributes: { ...operations.inner
          },
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: { ...main.icon.attributes,
              ...operations.path
            }
          }]
        }]
      };
    };
  }

};

const ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};

function fillBlack(abstract) {
  let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = 'black';
  }

  return abstract;
}

function deGroup(abstract) {
  if (abstract.tag === 'g') {
    return abstract.children;
  } else {
    return [abstract];
  }
}

var Masks = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const maskData = node.getAttribute('data-fa-mask');
        const mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(i => i.trim()));

        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }

        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute('data-fa-mask-id');
        return accumulator;
      }

    };
  },

  provides(providers) {
    providers.generateAbstractMask = function (_ref) {
      let {
        children,
        attributes,
        main,
        mask,
        maskId: explicitMaskId,
        transform
      } = _ref;
      const {
        width: mainWidth,
        icon: mainPath
      } = main;
      const {
        width: maskWidth,
        icon: maskPath
      } = mask;
      const trans = transformForSvg({
        transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      const maskRect = {
        tag: 'rect',
        attributes: { ...ALL_SPACE,
          fill: 'white'
        }
      };
      const maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      const maskInnerGroup = {
        tag: 'g',
        attributes: { ...trans.inner
        },
        children: [fillBlack({
          tag: mainPath.tag,
          attributes: { ...mainPath.attributes,
            ...trans.path
          },
          ...maskInnerGroupChildrenMixin
        })]
      };
      const maskOuterGroup = {
        tag: 'g',
        attributes: { ...trans.outer
        },
        children: [maskInnerGroup]
      };
      const maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      const clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      const maskTag = {
        tag: 'mask',
        attributes: { ...ALL_SPACE,
          id: maskId,
          maskUnits: 'userSpaceOnUse',
          maskContentUnits: 'userSpaceOnUse'
        },
        children: [maskRect, maskOuterGroup]
      };
      const defs = {
        tag: 'defs',
        children: [{
          tag: 'clipPath',
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: 'rect',
        attributes: {
          fill: 'currentColor',
          'clip-path': "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")"),
          ...ALL_SPACE
        }
      });
      return {
        children,
        attributes
      };
    };
  }

};

var MissingIconIndicator = {
  provides(providers) {
    let reduceMotion = false;

    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    providers.missingIconAbstract = function () {
      const gChildren = [];
      const FILL = {
        fill: 'currentColor'
      };
      const ANIMATION_BASE = {
        attributeType: 'XML',
        repeatCount: 'indefinite',
        dur: '2s'
      }; // Ring

      gChildren.push({
        tag: 'path',
        attributes: { ...FILL,
          d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
        }
      });
      const OPACITY_ANIMATE = { ...ANIMATION_BASE,
        attributeName: 'opacity'
      };
      const dot = {
        tag: 'circle',
        attributes: { ...FILL,
          cx: '256',
          cy: '364',
          r: '28'
        },
        children: []
      };

      if (!reduceMotion) {
        dot.children.push({
          tag: 'animate',
          attributes: { ...ANIMATION_BASE,
            attributeName: 'r',
            values: '28;14;28;28;14;28;'
          }
        }, {
          tag: 'animate',
          attributes: { ...OPACITY_ANIMATE,
            values: '1;0;1;1;0;1;'
          }
        });
      }

      gChildren.push(dot);
      gChildren.push({
        tag: 'path',
        attributes: { ...FILL,
          opacity: '1',
          d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
        },
        children: reduceMotion ? [] : [{
          tag: 'animate',
          attributes: { ...OPACITY_ANIMATE,
            values: '1;0;0;0;0;1;'
          }
        }]
      });

      if (!reduceMotion) {
        // Exclamation
        gChildren.push({
          tag: 'path',
          attributes: { ...FILL,
            opacity: '0',
            d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
          },
          children: [{
            tag: 'animate',
            attributes: { ...OPACITY_ANIMATE,
              values: '0;0;1;1;0;0;'
            }
          }]
        });
      }

      return {
        tag: 'g',
        attributes: {
          'class': 'missing'
        },
        children: gChildren
      };
    };
  }

};

var SvgSymbols = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const symbolData = node.getAttribute('data-fa-symbol');
        const symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
        accumulator['symbol'] = symbol;
        return accumulator;
      }

    };
  }

};

var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];

registerPlugins(plugins, {
  mixoutsTo: api
});
api.noAuto;
api.config;
api.library;
api.dom;
api.parse;
api.findIconDefinition;
api.toHtml;
const icon = api.icon;
api.layer;
api.text;
api.counter;

class Plot extends Component {
    constructor(options) {
        options = options || {};
        super(options);
        this.itemId = options.itemId || null;
        this.layout = options.layout || {};
        this.layout.margin = this.layout.margin || {top: 0, right: 0, bottom: 0, left: 0};
        this.headerOffset = 0;
        this.data = options.data || {};
    }

    get checkResize() {
        const ifResize = Math.round(this.width) !== Math.round(this.lastWidth) || Math.round(this.height) !== Math.round(this.lastHeight);
        return ifResize;
    }

    get checkMove() {
        const ifMove = Math.round(this.left) !== Math.round(this.lastLeft) || Math.round(this.top) !== Math.round(this.lastTop);
        return ifMove;
    }

    setLasts() {
        this.lastWidth = this.width;
        this.lastHeight = this.height;
        this.lastLeft = this.left;
        this.lastTop = this.top;
    }

    get plotAreaWidth() {
        return this.width - this.layout.margin.left - this.layout.margin.right;
    }

    get plotAreaHeight() {
        return this.height - this.layout.margin.top - this.layout.margin.bottom - this.headerOffset;
    }

    get plotAreaLeft() {
        return this.layout.margin.left;
    }

    get plotAreaTop() {
        return this.layout.margin.top + this.headerOffset;
    }

    get plotAreaId() {
        return `${this.id}-plot-area`;
    }

    addPlotAreaDiv() {
        const container = select(`#${this.id}`);
        container.append("div")
            .attr("id", `${this.plotAreaId}`)
            .attr("class", "plot-area")
            .style("position", "absolute")
            .style("top", `${this.plotAreaTop}px`)
            .style("left", `${this.plotAreaLeft}px`)
            .style("width", `${this.plotAreaWidth}px`)
            .style("height", `${this.plotAreaHeight}px`)
            .attr("width", this.plotAreaWidth)
            .attr("height", this.plotAreaHeight);
        return;
    }

    addPlotAreaSvg() {
        const container = select(`#${this.id}`);
        container.append("svg")
            .attr("id", `${this.plotAreaId}`)
            .attr("class", "plot-area")
            .style("position", "absolute")
            .style("top", `${this.plotAreaTop}px`)
            .style("left", `${this.plotAreaLeft}px`)
            .style("width", `${this.plotAreaWidth}px`)
            .style("height", `${this.plotAreaHeight}px`)
            .style("overflow", "visible")
            .attr("width", this.plotAreaWidth)
            .attr("height", this.plotAreaHeight);
        return;
    }

    updatePlotAreaSize() {
        const container = select(`#${this.id}`);
        const plotArea = container.select(".plot-area");
        plotArea
            .style("top", `${this.plotAreaTop}px`)
            .style("left", `${this.plotAreaLeft}px`)
            .style("width", `${this.plotAreaWidth}px`)
            .style("height", `${this.plotAreaHeight}px`)
            .attr("width", this.plotAreaWidth)
            .attr("height", this.plotAreaHeight);
        return;
    }

    addTitle() {
        const container = select(`#${this.id}`);
        if ( !this.layout.title ) {
            container.select(".plot-title").remove();
            return;
        }
        const title = container.select(".plot-title");
        if ( title.empty() ) {
            const newTitle = container.append("div")
                .attr("class", "plot-title")
                .attr("id", `${this.id}-plot-title`)
                .style("position", "absolute")
                .style("top", "0")
                .style("left", "0")
                .style("width", "100%")
                .style("display", "flex")
                .style("justify-content", "space-between")
                .style("align-items", "center")
                .append("div")
                    .attr("class", "plot-title-text")
                    .style("text-align", "left")
                    .text(this.layout.title);
            this.headerOffset = newTitle.node().clientHeight + 3;
        } else {
            title.select(".plot-title-text").text(this.layout.title);
            this.headerOffset = title.node().clientHeight + 3;
        }
    }

    addIcons() {
        const container = select(`#${this.id}`);
        const iconList = this.icons;
        if (!iconList || iconList.length === 0) {
            container.select(".plot-icons").remove();
            return; 
        }
        const title = container.select(".plot-title");
        let iconContainer = container.select(".plot-title").select(".plot-icons");
        if ( iconContainer.empty() ) {
            if ( title.empty() ) {
                iconContainer = container.append("div");
            } else {
                iconContainer = title.append("div");
            }
            iconContainer
                .attr("class", "plot-icons")
                .attr("id", `${this.id}-plot-icons`)
                //.style("position", "absolute")
                //.style("top", "0")
                //.style("right", "0")
                .style("display", "flex")
                .style("justify-content", "flex-end")
                .style("align-items", "center")
                .style("pointer-events", "all");
        }

        const icons = iconContainer.selectAll(".plot-icon").data(iconList);

        icons.enter()
            .append("div")
                .attr("class", "plot-icon")
                .attr("id", (d,i) => {
                    if (d.id) {
                        return d.id;
                    } else {
                        return `icon-${i}`;
                    }
                })
                .style("margin-left", "5px")
                .style("font-size", "1.0em")
                .html(d => icon(d.icon).html)
                .on("click", function(e,d){d.action();} );
        icons.exit().remove();
    }

    updateHeader() {
        this.addTitle();
        this.addIcons();
        return;
    }

}

class NodePlot extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
        this.layout.nodeBoxMargin = this.layout.nodeBoxMargin || 7;
        this.layout.socketRadius = this.layout.socketRadius || 5;
        this.name = options.name || "node name";
        this.data.sockets.forEach( socket => {
            socket.cenLast = {x: 0, y: 0};
        });
    }

    make() {
        this.addPlotAreaSvg();
        this.update();
    }

    update() {
        const node = this.data;
        const container = select(`#${this.id}`);
		const plotArea = container.select(".plot-area");
        const parentId = this.ancestorIds[this.ancestorIds.length - 1];
        const socketAbsolutePositions = this.sharedStateByAncestorId[parentId].socketAbsolutePositions;
        const selectedNode = this.sharedStateByAncestorId[this.boardId].selectedNode;

        this.updatePlotAreaSize();

        const nodeBoxMargin = this.layout.nodeBoxMargin;
        const nodeRectWidth = this.plotAreaWidth - 2 * nodeBoxMargin;
        const nodeRectHeight = this.plotAreaHeight - 2 * nodeBoxMargin;
        let nodeRect = plotArea.select(".node-rect");
        let nodeTitle = plotArea.select(".node-title");
        if (nodeRect.empty()) {
            nodeRect = plotArea.append("rect")
                .attr("class", "node-rect")
                .attr("x", nodeBoxMargin)
                .attr("y", nodeBoxMargin)
                .attr("fill", Tableau10[node.colorIndex])
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("rx", 10)
                .style("pointer-events", "all")
                .on("click", () => {selectedNode.state = {name: node.name};});
            nodeTitle = plotArea.append("text")
                .attr("class", "node-title")
                .attr("x", nodeRectWidth/2. + nodeBoxMargin )
                .attr("y", nodeRectHeight/2. + nodeBoxMargin )
                .attr("font-size", "16px")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .text(node.name);
        }
        nodeRect
            .attr("width", nodeRectWidth)
            .attr("height", nodeRectHeight);

        nodeTitle
            .attr("x", nodeRectWidth/2 + this.layout.nodeBoxMargin )
            .attr("y", nodeRectHeight/2 + this.layout.nodeBoxMargin );

        const allSockets = node.sockets;
        const leftSockets = allSockets.filter(socket => socket.position == "left");
        const rightSockets = allSockets.filter(socket => socket.position == "right");
        const topSockets = allSockets.filter(socket => socket.position == "top");
        const bottomSockets = allSockets.filter(socket => socket.position == "bottom");
        allSockets.filter(socket => socket.position == "centre");

        const leftSocketSpacing = nodeRectHeight / (leftSockets.length + 1);
        const rightSocketSpacing = nodeRectHeight / (rightSockets.length + 1);
        const topSocketSpacing = nodeRectWidth / (topSockets.length + 1);
        const bottomSocketSpacing = nodeRectWidth / (bottomSockets.length + 1);

        const normalLength = 140;

        leftSockets.forEach((socket, index) => {
            const socketY = (index + 1) * leftSocketSpacing + nodeBoxMargin;
            socket.cen = {x: nodeBoxMargin, y: socketY};
            socket.normal = {x: nodeBoxMargin - normalLength, y: socketY};
            checkSocketMove(socket);
        });
        rightSockets.forEach((socket, index) => {
            const socketY = (index + 1) * rightSocketSpacing + nodeBoxMargin;
            socket.cen = {x: nodeRectWidth + nodeBoxMargin, y: socketY};
            socket.normal = {x: nodeRectWidth + nodeBoxMargin + normalLength, y: socketY};
            checkSocketMove(socket);
        });
        topSockets.forEach((socket, index) => {
            const socketX = (index + 1) * topSocketSpacing + nodeBoxMargin;
            socket.cen = {x: socketX, y: nodeBoxMargin};
            socket.normal = {x: socketX, y: nodeBoxMargin - normalLength};
            checkSocketMove(socket);
        });
        bottomSockets.forEach((socket, index) => {
            const socketX = (index + 1) * bottomSocketSpacing + nodeBoxMargin;
            socket.cen = {x: socketX, y: nodeRectHeight + nodeBoxMargin};
            socket.normal = {x: socketX, y: nodeRectHeight + nodeBoxMargin + normalLength};
            checkSocketMove(socket);
        });

        const sockets = plotArea.selectAll(".socket")
            .data(allSockets, d => d.name);
        sockets.enter()
            .append("circle")
            .attr("class", "socket")
            .attr("r", this.layout.socketRadius)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("cx", d => d.cen.x)
            .attr("cy", d => d.cen.y);
        sockets
            .attr("cx", d => d.cen.x)
            .attr("cy", d => d.cen.y);
        sockets.exit().remove();        


        function checkSocketMove(socket) {
            let socketMoved = false;
            const rect = plotArea.node().getBoundingClientRect();
            const cenXAbs = socket.cen.x + rect.left;
            const cenYAbs = socket.cen.y + rect.top;
            const xMove = Math.abs(cenXAbs - socket.cenLast.x) > 0.5;
            const yMove = Math.abs(cenYAbs - socket.cenLast.y) > 0.5;
            if (xMove || yMove) {
                socketMoved = true;
            }

            if (socketMoved) {
                socket.cenLast = {x: cenXAbs, y: cenYAbs};
                const cen = {x:cenXAbs, y:cenYAbs};
                const normal = {x: socket.normal.x + rect.left, y: socket.normal.y + rect.top};
                socketAbsolutePositions.find( s => s.socketName == socket.name).position.state = {socketName: socket.name, cen, normal};
            }
        }

    }
}

class ModelStructureViewer extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
    }

    make() {
        this.updateHeader();
        this.addPlotAreaSvg();
        this.updateHeader();
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;
        selectedLog.subscribe(this.highlightLog.bind(this));
        const sockets = this.data.nodes.map( node => node.sockets ).flat();
        const socketAbsolutePositions = sockets.map( socket => 
            { 
                const obs = new Observable({state:{socketName: socket.name, cen: null, normal:null}});
                obs.subscribe( this.drawLink.bind(this) );
                return {socketName: socket.name, position: obs} 
            });
        this.sharedState.socketAbsolutePositions = socketAbsolutePositions;


        const plotArea = select(`#${this.plotAreaId}`);
        plotArea.style("pointer-events", "all");
        Tableau10.forEach( (color, i) => {
            const markerId = `arrowhead-${i}`;
            plotArea.append("defs").append("marker")
                .attr("id", markerId)
                .attr("viewBox", "-10 -10 20 20")
                .attr("refX", 10)
                .attr("refY", 0)
                .attr("markerWidth", 10)
                .attr("markerHeight", 10)
                .attr("orient", "auto")
                .append("path")
                    .attr("d", "M-6,-6 L6,0 L-6,6 Z")
                    .attr("fill", color);
        });


        this.update();
    }

    update() {
        const nodes = this.data.nodes || [];

        const nodeNamesInData = nodes.map(node => node.name);
        const currentBoxes = this.sharedState.boxes || [];
        const currentNodeNames = currentBoxes.map(box => box.name);
        const nodeNamesToAdd = nodeNamesInData.filter(name => !currentNodeNames.includes(name));
        const nodeNamesToRemove = currentNodeNames.filter(name => !nodeNamesInData.includes(name));
        const boxesToRemove = currentBoxes.filter( box => nodeNamesToRemove.includes( box.name ) ).map( box => box.boxId );
        const boxesToAdd = [];
        nodeNamesToAdd.forEach( name => {
            const node = nodes.find( node => node.name == name );
            const position = node.position;
            const box=new Box({x: position.x, y: position.y, width: position.width, height: position.height, componentMargin:{top:0, left:0, bottom:0, right:0}, name: node.name, className: "node-plot", component: new NodePlot({data:node, name:node.name}) });
            boxesToAdd.push(box);
        });
        this.sharedState.requestUpdateBoxes.state = {boxesToRemove, boxesToAdd};


    }

    drawLink(data) {
        const socketName = data.socketName;
        const thisSocketCen = data.cen;
        const thisSocketNormal = data.normal;
        const logNames = this.data.logs.map( log => ({name:log.name, targetName:log.targetName}) );
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;

        const link = this.data.links.find( link => link.socketNames.includes(socketName) );
        const otherSocketName = link.socketNames.find( name => name != socketName );
        const socketAbsolutePositions = this.sharedState.socketAbsolutePositions;
        const otherSocketPosition = socketAbsolutePositions.find( s => s.socketName == otherSocketName).position.state;
        const otherSocketCen = otherSocketPosition.cen;
        const otherSocketNormal = otherSocketPosition.normal;
        let firstSocketCen, firstSocketNormal, secondSocketCen, secondSocketNormal;
        if ( socketName == link.socketNames[0] ) {
            firstSocketCen = thisSocketCen;
            firstSocketNormal = thisSocketNormal;
            secondSocketCen = otherSocketCen;
            secondSocketNormal = otherSocketNormal;
        } else {
            firstSocketCen = otherSocketCen;
            firstSocketNormal = otherSocketNormal;
            secondSocketCen = thisSocketCen;
            secondSocketNormal = thisSocketNormal;
        }
   
        if (otherSocketCen) {
            const plotArea = select(`#${this.plotAreaId}`);
            const boundingRect = plotArea.node().getBoundingClientRect();
            const x0 = boundingRect.left;
            const y0 = boundingRect.top;
            const pathData = `M${firstSocketCen.x-x0},${firstSocketCen.y-y0} C${firstSocketNormal.x-x0},${firstSocketNormal.y-y0} ${secondSocketNormal.x-x0},${secondSocketNormal.y-y0} ${secondSocketCen.x-x0},${secondSocketCen.y-y0}`;
            const linkId = `${this.id}-${link.name.replace(/ /g, "-")}`;
            let linkPath = plotArea.select(`#${linkId}`);
            if (linkPath.empty()) {
                linkPath = plotArea.append("path")
                    .datum(link)
                    .attr("class", "link")
                    .attr("id", linkId)
                    .attr("d", pathData)
                    .attr("fill", "none")
                    .attr("stroke", Tableau10[link.colorIndex])
                    .attr("stroke-width", 2)
                    .attr("marker-end", `url(#arrowhead-${link.colorIndex})`)
                    .on("mouseenter", tipOnLink)
                    .on("mouseleave", tipOffLink);
            } else {
                linkPath
                    .datum(link)
                    .attr("d", pathData);
            }
        }

        function tipOnLink(event, d) {
            const linkName = d.name;
            const log = logNames.find( l => l.targetName == linkName);
            if (log) {
                selectedLog.state = {name: log.name, targetName: log.targetName};
            }
        }

        function tipOffLink(event, d) {
            selectedLog.state = {name: null, targetName: null};
        }
    }

    highlightLog(data) {
        const targetName = data.targetName;
        if (this.data.links.map(l => l.name).includes(targetName)) {
            this.highlightLink(targetName);
        }
        if (!targetName) {
            this.highlightLink("");
        }
    }

    highlightLink(linkName) {
        const plotArea = select(`#${this.plotAreaId}`);
        const linkId = `${this.id}-${linkName.replace(/ /g, "-")}`;
        const allLinks = plotArea.selectAll(".link");
        allLinks.each(function(d) {
            const linkPath = select(this);
            if (linkPath.attr("id") == linkId) {
                linkPath.attr("stroke-width", 4);
            } else {
                linkPath.attr("stroke-width", 2);
            }
        });
    }


}

const faChartLine = {
  prefix: 'fas',
  iconName: 'chart-line',
  icon: [512, 512, ["line-chart"], "f201", "M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]
};
const faChartColumn = {
  prefix: 'fas',
  iconName: 'chart-column',
  icon: [512, 512, [], "e0e3", "M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm128-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM480 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]
};

class LogViewer extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
        this.linePlot = true;
        this.barPlot = false;   
    }

    make() {
        this.icons = [];
        const boundLinePlotSelected = this.linePlotSelected.bind(this);
        const boundBarPlotSelected = this.barPlotSelected.bind(this);
        this.icons.push( {icon: faChartLine, id:"line-icon", action:boundLinePlotSelected } );
        this.icons.push( {icon: faChartColumn, id:"bar-icon", action:boundBarPlotSelected } );
        this.updateHeader();
        this.addPlotAreaSvg();
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;
        selectedLog.subscribe(this.highlightLog.bind(this));
        this.setPlotIconBackground();
        this.update();
    }

    update() {
        this.updateHeader();
        this.updatePlotAreaSize();

        const logs = this.data.logs || [];
        const selectedLog = this.sharedStateByAncestorId[this.boardId].selectedLog;

        const modelName = this.sharedStateByAncestorId[this.boardId].modelName;
        const modelConfig = this.sharedStateByAncestorId["context"].models.find( model => model.name == modelName ).config;
        const timeStepSize = modelConfig.timeStepSize || 1;
        const timeIntegrationUnitFactor = modelConfig.timeIntegrationUnitFactor || 1;
        
        const lines = [];
        const bars = [];
        logs.forEach(log => {
            const line = {};
            line.name = log.name;
            line.targetName = log.targetName;
            line.colorIndex = log.colorIndex;
            const pts = log.states.map((state, i) => {
                return {x: i, y: state.value};
            });
            line.pts = pts;
            lines.push(line);
            const bar = {};
            bar.name = log.name;
            bar.targetName = log.targetName;
            bar.colorIndex = log.colorIndex;
            bar.value = log.states.reduce((acc, curr, index) => {
                if ( index === 0 ) return acc;
                const previous = log.states[index-1];
                return acc + (curr.value + previous.value) / 2 * timeStepSize;
            }, 0);
            bar.value /= timeIntegrationUnitFactor;
            bars.push(bar);

        });

        const plotArea = select(`#${this.plotAreaId}`);
        const plotAreaWidth = this.plotAreaWidth;
        const plotAreaHeight = this.plotAreaHeight;

        if (this.linePlot) {
  
            const margin = {top: 20, right: 20, bottom: 30, left: 50};
            const width = plotAreaWidth - margin.left - margin.right;
            const height = plotAreaHeight - margin.top - margin.bottom;

            const lineExtents = lines.map(line => {
                return {
                    x: extent(line.pts, d => d.x),
                    y: extent(line.pts, d => d.y)
                };
            });

            const xExtent = extent(lineExtents.map(l=>l.x).flat());
            const yExtent = extent(lineExtents.map(l=>l.y).flat());

            const x = linear().domain(xExtent).range([0, width]);
            const y = linear().domain(yExtent).range([height, 0]);

            let linePlotSvg = plotArea.select(".line-plot-svg");
            let barChartSvg = plotArea.select(".bar-chart-svg");
            barChartSvg.remove();

            if (linePlotSvg.empty()) {
                linePlotSvg = plotArea.append("g")
                    .attr("class", "line-plot-svg")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("pointer-events", "all");
            }
        
            const line$1 = line()
                .x(d => x(d.x))
                .y(d => y(d.y));

            const allLines = linePlotSvg.selectAll(".line")
                .data(lines, d => d.name);

            allLines.enter()
                .each(function(d) {
                    select(this).append("g")
                        .attr("class", "line")
                        .append("path")
                            .attr("class", "line-path")
                            .attr("d", d =>line$1(d.pts))
                            .attr("stroke", d => Tableau10[d.colorIndex])
                            .attr("fill", "none")
                            .attr("stroke-width", 2)
                            .on("mouseenter", tipOn)
                            .on("mouseleave", tipOff);
            });

            allLines
                .each(function(d) {
                    select(this).select("path")
                        .attr("d", d =>line$1(d.pts))
                        .attr("stroke", d => Tableau10[d.colorIndex]);
            });

            allLines.exit().remove();

            const xAxis = axisBottom(x);
            const yAxis = axisLeft(y);

            let gX = linePlotSvg.select(".x-axis");
            if (gX.empty()) {
                gX = linePlotSvg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", `translate(0, ${height})`)
                    .call(xAxis);
            } else {
                gX.call(xAxis);
            }

            let gY = linePlotSvg.select(".y-axis");
            if (gY.empty()) {
                gY = linePlotSvg.append("g")
                    .attr("class", "y-axis")
                    .call(yAxis);
            } else {
                gY.call(yAxis);
            }
        }

        if (this.barPlot) {
            const margin = {top: 20, right: 20, bottom: 30, left: 40};
            const width = plotAreaWidth - margin.left - margin.right;
            const height = plotAreaHeight - margin.top - margin.bottom;

            const barExtent = extent(bars.map(b => b.value));

            const x = band()
                .domain(bars.map(b => b.name))
                .range([0, width])
                .padding(0.1);

            const y = linear()
                .domain([0, barExtent[1]])
                .range([height, 0]);

            let linePlotSvg = plotArea.select(".line-plot-svg");
            let barChartSvg = plotArea.select(".bar-chart-svg");
            linePlotSvg.remove();

            if (barChartSvg.empty()) {
                barChartSvg = plotArea.append("g")
                    .attr("class", "bar-chart-svg")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("pointer-events", "all");
            }

            const barRects = barChartSvg.selectAll(".bar")
                .data(bars, d => d.name );

            barRects.enter()
                .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => x(d.name))
                    .attr("y", d => y(d.value))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.value))
                    .attr("fill", d => Tableau10[d.colorIndex])
                    .on("mouseenter", tipOn)
                    .on("mouseleave", tipOff);

            barRects
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.value))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.value));

            barRects.exit().remove();

            const xAxis = axisBottom(x);
            const yAxis = axisLeft(y);

            let gX = barChartSvg.select(".x-axis");
            if (gX.empty()) {
                gX = barChartSvg.append("g")
                    .attr("class", "x-axis")
                    .attr("transform", `translate(0, ${height})`);
            }
            gX.call(xAxis)
                .selectAll("text")
                .attr("y", 0)
                .attr("x", 0)
                .attr("dy", ".35em")
                .attr("transform", "translate(0, 10)")
                .style("text-anchor", "middle")
                .call(wrapText, x.bandwidth());

            let gY = barChartSvg.select(".y-axis");
            if (gY.empty()) {
                gY = barChartSvg.append("g")
                    .attr("class", "y-axis");
            }
            gY.call(yAxis);
        }

        function tipOn(event, d) {
            selectedLog.state = {name: d.name, targetName: d.targetName};
        }
        function tipOff(event, d) {
            selectedLog.state = {name: null, targetName: null};
        }

        function wrapText(text, width) {
            text.each(function () {
                const textElement = select(this);
                const words = textElement.text().split(/\s+/).reverse();
                let word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = textElement.attr("y"),
                    dy = parseFloat(textElement.attr("dy")),
                    tspan = textElement.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", `${dy}em`);

                while ((word = words.pop())) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = textElement.append("tspan")
                            .attr("x", 0)
                            .attr("y", y)
                            .attr("dy", `${++lineNumber * lineHeight + dy}em`)
                            .text(word);
                    }
                }
            });
        }
    }

    highlightLog(data) {
        const logName = data.name;
        const plotArea = select(`#${this.plotAreaId}`);
        const allLines = plotArea.selectAll(".line");
        allLines.each(function(d) {
            if (d.name == logName) {
                select(this).select("path").attr("stroke-width", 4);
            } else {
                select(this).select("path").attr("stroke-width", 2);
            }
        });
        const allBars = plotArea.selectAll(".bar");
        allBars.each(function(d) {
            if (d.name == logName || !logName) {
                select(this).style("opacity", 1);
            } else {
                select(this).style("opacity", 0.6);
            }
        });

    }

    setPlotIconBackground() {
        const container = select(`#${this.id}`);
        const iconContainer = container.select(".plot-icons");
        const lineIcon = iconContainer.select("#line-icon");
        const barIcon = iconContainer.select("#bar-icon");
        if (this.linePlot) {
            lineIcon.style("color", "black");
            barIcon.style("color", "gray");
        }
        if (this.barPlot) {
            lineIcon.style("color", "gray");
            barIcon.style("color", "black");
        }
    }

    linePlotSelected() {
        this.linePlot = true;
        this.barPlot = false;
        this.setPlotIconBackground();
        this.update();
    }

    barPlotSelected() {
        this.linePlot = false;
        this.barPlot = true;
        this.setPlotIconBackground();
        this.update();
    }
    
}

class NodeInspector extends Plot {
    constructor(options) {
        options = options || {};
        super(options);
    }

    make() {
        this.updateHeader();
        this.addPlotAreaDiv();
        const selectedNode= this.sharedStateByAncestorId[this.boardId].selectedNode;
        selectedNode.subscribe(this.update.bind(this));
        const plotArea = select(`#${this.plotAreaId}`);
        plotArea
            .style("pointer-events", "all")
            .style("overflow-y", "auto")
            .style("overflow-x", "hidden");
        //plotArea.append("div")
        //    .attr("id", "sliders")
        //   .style("pointer-events", "all");
    }

    update() {
        const selectedNode = this.sharedStateByAncestorId[this.boardId].selectedNode;
        const nodeName = selectedNode.state.name;
        const modelName = this.sharedStateByAncestorId[this.boardId].modelName;
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == modelName );
        const node = model.nodes.find( node => node.name == nodeName );

        const requestSetNodeStateData = this.sharedStateByAncestorId[this.boardId].requestSetNodeStateData;
        const requestRunModelAndUpdateViews = this.sharedStateByAncestorId[this.boardId].requestRunModelAndUpdateViews;

        const plotArea = select(`#${this.plotAreaId}`);

        plotArea.select(".node-title").remove();
        plotArea.append("div")
            .attr("class", "node-title")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("margin-top", "5px")
            .style("margin-bottom", "2px")
            .text(nodeName);

        plotArea.select(".sliders").remove();
        const slidersContainer = plotArea.append("div")
            .attr("class", "sliders");
            

        const sliderData = Object.entries(node.state).map(([key, value]) => {
            return {name: key, value: value, min: 0., max: 2*value};
        });


        const sliders = slidersContainer.selectAll(".slider-container")
            .data(sliderData);

        sliders
            .join(
                // Enter selection: append new slider containers for new data
                enter => {
                    const container = enter.append("div")
                        .attr("class", "slider-container")
                        .style("display", "flex")
                        .style("flex-direction", "column")
                        .style("padding", "10px 0");

                    // Add name label for the parameter
                    container.append("div")
                        .attr("class", "slider-label")
                        .text(d => d.name)
                        .style("font-size", "12px")
                        .style("font-weight", "bold")
                        //.style("margin-bottom", "5px")
                        .style("text-align", "left");

                    const sliderWrapper = container.append("div")
                        .attr("class", "slider-wrapper")
                        .style("display", "flex")
                        .style("align-items", "center")
                        .style("gap", "10px");


                    // Add the range slider
                    sliderWrapper.append("input")
                        .attr("type", "range")
                        .attr("class", "slider")
                        .attr("id", d => `slider-${d.name}`)
                        .attr("min", d => d.min)
                        .attr("max", d => d.max)
                        .attr("value", d => d.value)
                        .attr("step", d=>(d.max - d.min) / 200)
                        .style("width", "200px")
                        .on("input", function(event, d) {
                            // Update displayed value
                            select(`#value-${d.name}`).text(this.value);
                            updateSliderRange(d.name);
                        });

                    // Add label to show current slider value
                    sliderWrapper.append("div")
                        .attr("class", "slider-value")
                        .attr("id", d => `value-${d.name}`)
                        .style("font-size", "14px")
                        .style("min-width", "50px")
                        .style("text-align", "center")
                        .text(d => d.value);
                },
              
                // Exit selection: remove any sliders that no longer have corresponding data
                exit => exit.remove()
            );

        




        // Function to update sliders based on the bound data
        function updateSliderRange(key) {
            
            const currentValue = +select(`#slider-${key}`).node().value;

            requestSetNodeStateData.state = {nodeName: nodeName, key: key, value: currentValue};
            requestRunModelAndUpdateViews.state = true;
            



        }

    }

}

class Model {
    constructor(options) {
        options = options || {};
        this.name = options.name || 'modelName';
        this.nodes = options.nodes || [];
        this.links = options.links || [];
        this.logs = options.logs || [];
        this.maxNodeId = 0;
        this.maxLinkId = 0;
        this.maxLogId = 0;
    }

    getNodeId() {
        let newNodeId = `node-${this.maxNodeId}`;
        this.maxNodeId++;
        return newNodeId;
    }

    getLinkId() {
        let newLinkId = `link-${this.maxLinkId}`;
        this.maxLinkId++;
        return newLinkId;
    }

    getLogId() {
        let newLogId = `log-${this.maxLogId}`;
        this.maxLogId++;
        return newLogId;
    }

    addNode(node) {
        node.id = this.getNodeId();
        this.nodes.push(node);
    }

    addLink(link) {
        link.id = this.getLinkId();
        const s1 = link.socket1;
        s1.link = link;
        s1.otherSocket = link.socket2;
        const s2 = link.socket2;
        s2.link = link;
        s2.otherSocket = link.socket1;
        this.links.push(link);
    }

    addLog(log) {
        log.id = this.getLogId();
        this.logs.push(log);
    }

    removeNode(node) {
        this.nodes = this.nodes.filter(n => n !== node);
    }

    removeLink(link) {
        this.links = this.links.filter(l => l !== link);
    }

    removeLog(log) {
        this.logs = this.logs.filter(l => l !== log);
    }

    removeNodeById(id) {
        this.nodes = this.nodes.filter(n => n.id !== id);
    }

    removeLinkById(id) {
        this.links = this.links.filter(l => l.id !== id);
    }

    removeLogById(id) {
        this.logs = this.logs.filter(l => l.id !== id);
    }

    clearLogs() {
        this.logs.forEach(l => l.clear());
    }

    getLinkBySocket(socket) {
        return this.links.find(l => l.socket1 === socket || l.socket2 === socket);
    }

    getNodeBySocket(socket) {
        return this.nodes.find(n => n.sockets.includes(socket));
    }

    getNodeByName(name) {
        return this.nodes.find(n => n.name === name);
    }

    getLinkByName(name) {
        return this.links.find(l => l.name === name);
    }

    getNodeClassByClassName(className) {
        if (!this.availableNodeClasses) {
            return null;
        }
        const availableNodeClassNames = this.availableNodeClasses.map(c => {
            const instance = new c();
            return instance.className;
        });
        const index = availableNodeClassNames.indexOf(className);
        if (index === -1) {
            return null;
        } else {
            return this.availableNodeClasses[index];
        }   
    }

    getLinkClassByClassName(className) {
        if (!this.availableLinkClasses) {
            return null;
        }
        if (this.availableLinkClasses.length === 1) {
            return this.availableLinkClasses[0];
        }
        const availableLinkClassNames = this.availableLinkClasses.map(c => {
            const instance = new c();
            return instance.className;
        });
        const index = availableLinkClassNames.indexOf(className);
        if (index === -1) {
            return null;
        } else {
            return this.availableLinkClasses[index];
        }   
    }

    get allSockets() {
        return this.nodes.map(n => n.sockets).flat();
    }

    getSocketByName(socketName) {
        return this.allSockets.find(s => s.name == socketName);
    }

    toJson() {
        const modelForJson = {};
        modelForJson.config = this.config;
        modelForJson.nodes = this.nodes.map(n => {
            const nJson = {};
            nJson.name = n.name;
            nJson.className = n.className;
            nJson.state = n.state;
            nJson.displayConfig = n.displayConfig;
            nJson.sockets = n.sockets.map(s => {
                const sJson = {};
                sJson.name = s.name;
                sJson.position = s.position;
                if (s.state.valueType == "variable" && s.state.max == Infinity) {
                    s.state.max = -1;
                }
                sJson.state = s.state;
                return sJson;
            });
            return nJson;
        });
        modelForJson.links = this.links.map(l => {
            const lJson = {};
            lJson.name = l.name;
            lJson.socket1Name = l.socket1.name;
            lJson.socket2Name = l.socket2.name;
            return lJson;
        });
        modelForJson.logs = this.logs.map(l => {
            const lJson = {};
            lJson.name = l.name;
            lJson.targetName = l.target.name;
            return lJson;
        });
        return JSON.stringify(modelForJson);
    }

    saveToFile() {
        const modelJson = this.toJson();
        const blob = new Blob([modelJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'model.json';
        a.click();
    }

    fromJsonObject(jsonModel) {
        this.config = jsonModel.config;
        jsonModel.nodes.forEach(n => {
            const NodeClass = this.getNodeClassByClassName(n.className);
            const node = new NodeClass(n);
            node.sockets = n.sockets.map(s => {
                if (s.state.valueType == "variable" && s.state.max==-1) {
                    s.state.max = Infinity;
                }
                return (new Socket(s));
            }); 
            this.addNode(node);
        });
        jsonModel.links.forEach(l => {
            const socket1 = this.getSocketByName(l.socket1Name);
            const socket2 = this.getSocketByName(l.socket2Name);
            let LinkClass;
            if (!l.className) {
                LinkClass = this.getLinkClassByClassName();
            } else {
                LinkClass = this.getLinkClassByClassName(l.className);
            }
            this.addLink(new LinkClass({name:l.name, socket1, socket2, colorIndex:l.colorIndex}));
        });
        jsonModel.logs.forEach(l => {
            const targetNode = this.getNodeByName(l.targetName);
            const targetLink = this.getLinkByName(l.targetName);
            const target = targetNode || targetLink;
            this.addLog(new Log({name:l.name, target, colorIndex:l.colorIndex, targetName:l.targetName}));
        });

    }

    async loadFromUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        this.fromJsonObject(json);
    }

    startVis(options) {
        options = options || {};
        const targetId = options.targetId || 'target';
        const height = options.height || 600;
        const ctx = new Context();
        ctx.addModel(this);
        const board = new Board({targetId, fixed:true, modelName:this.name, widthPerCent:100, height:height});
        ctx.addBoard(board);
        const nodeDisplayData = this.nodes.map(n => n.displayData);
        const linkDisplayData = this.links.map(l => l.displayData);
        const logDisplayData = this.logs.map(l => l.displayData);
        const boxModelStructure = new Box({fixed:true, xPerCent:2, yPerCent:2, widthPerCent:58, heightPerCent:96, className: "model-structure-viewer", component: new ModelStructureViewer({layout:{title:"Model structure"},data:{nodes:nodeDisplayData, links:linkDisplayData, logs:logDisplayData}}) });
        board.addBox(boxModelStructure);
        const boxLogViewer = new Box({fixed:true, xPerCent:62, yPerCent:2, widthPerCent:36, heightPerCent:50, className: "log-viewer", component: new LogViewer({layout:{title:"Logs"},data:{logs:logDisplayData}}) });
        board.addBox(boxLogViewer);
        const boxNodeInspector = new Box({fixed:true, xPerCent:62, yPerCent:54, widthPerCent:36, heightPerCent:44, className: "node-inspector", component: new NodeInspector({layout:{title:"Node Inspector"},data:null}) });
        board.addBox(boxNodeInspector);
        board.make();
        return ctx;
    }


}

let Node$1 = class Node {
    constructor(options) {
        this.name = options.name || 'node';
        this.className = options.className || 'nodeClass';   
        this.sockets = [];
        this.state = options.state || {};
        this.maxSocketId = 0;
        if (options.sockets) {
            options.sockets.forEach(socket => {
                this.addSocket(socket);
            });
        }
        const displayConfig = options.displayConfig || {};
        const position = displayConfig.position || {x: 0, y: 0};
        position.width = position.width || 100;
        position.height = position.height || 100;
        const colorIndex = displayConfig.colorIndex || 0;
        this.displayConfig = { position, colorIndex };
    }

    getSocketId() {
        let newSocketId = `socket-${this.maxSocketId}`;
        this.maxSocketId++;
        return newSocketId;
    }

    get leftSockets() {
        return this.sockets.filter(s => s.position === 'left');
    }

    get rightSockets() {
        return this.sockets.filter(s => s.position === 'right');
    }

    get topSockets() {
        return this.sockets.filter(s => s.position === 'top');
    }

    get bottomSockets() {
        return this.sockets.filter(s => s.position === 'bottom');
    }
    
    addSocket(socket) {
        socket.id = this.getSocketId();
        this.sockets.push(socket);
    }

    setSocketByIndex(index, socket) {
        socket.id = this.getSocketId();
        this.sockets[index] = socket;
    }

    getSocketByIndex(index) {
        return this.sockets[index];
    }
    
    getSocketByName(name) {
        return this.sockets.find(s => s.name === name);
    }

    removeSocket(socket) {
        this.sockets = this.sockets.filter(s => s !== socket);
    }

    removeSocketById(id) {
        this.sockets = this.sockets.filter(s => s.id !== id);
    }

    removeSocketByIndex(index) {
        this.sockets = this.sockets.filter((s, i) => i !== index);
    }

    setSocketOrderByName(options) {
        const order = options.order;
        const position = options.position;
        if (position) {
            this.sockets.sort((a, b) => {
                if (a.position === position && b.position === position) {
                    return order.indexOf(a.name) - order.indexOf(b.name);
                }
                if (a.poistion === position) return -1;
                if (b.position === position) return 1;
                return 0;
            });
        } else {
            this.sockets.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
        }
    }
    
    get displayData() {
        return {
            name: this.name,
            className: this.className,
            position: this.displayConfig.position,
            colorIndex: this.displayConfig.colorIndex,
            sockets: this.sockets.map(s => ({name: s.name, position: s.position}))
        };
    }


};

class Link {
    constructor(options) {
        options = options || {};
        this.name = options.name || "link";
        this.socket1 = options.socket1 || null;
        this.socket2 = options.socket2 || null;
        this.state = options.state || {};
        this.colorIndex = options.colorIndex || 0;
    }

    getOtherSocket(socket) {
        if (socket === this.socket1) {
            return this.socket2;
        } else if (socket === this.socket2) {
            return this.socket1;
        } else {
            return null;
        }
    }

    get displayData() {
        return {
            name: this.name,
            socketNames: [this.socket1.name, this.socket2.name],
            colorIndex: this.colorIndex
        };
    }

}

export { Link, Log, Model, Node$1 as Node, Socket };
