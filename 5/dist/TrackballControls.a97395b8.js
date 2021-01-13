// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dependencies/TrackballControls.js":[function(require,module,exports) {
THREE.TrackballControls = function (object, domElement) {
  if (domElement === undefined) console.warn('THREE.TrackballControls: The second parameter "domElement" is now mandatory.');
  if (domElement === document) console.error('THREE.TrackballControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
  var scope = this;
  var STATE = {
    NONE: -1,
    ROTATE: 0,
    ZOOM: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_ZOOM_PAN: 4
  };
  this.object = object;
  this.domElement = domElement; // API

  this.enabled = true;
  this.screen = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  this.rotateSpeed = 1.0;
  this.zoomSpeed = 1.2;
  this.panSpeed = 0.3;
  this.noRotate = false;
  this.noZoom = false;
  this.noPan = false;
  this.staticMoving = false;
  this.dynamicDampingFactor = 0.2;
  this.minDistance = 0;
  this.maxDistance = Infinity;
  this.keys = [65
  /*A*/
  , 83
  /*S*/
  , 68
  /*D*/
  ];
  this.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.ZOOM,
    RIGHT: THREE.MOUSE.PAN
  }; // internals

  this.target = new THREE.Vector3();
  var EPS = 0.000001;
  var lastPosition = new THREE.Vector3();
  var lastZoom = 1;

  var _state = STATE.NONE,
      _keyState = STATE.NONE,
      _eye = new THREE.Vector3(),
      _movePrev = new THREE.Vector2(),
      _moveCurr = new THREE.Vector2(),
      _lastAxis = new THREE.Vector3(),
      _lastAngle = 0,
      _zoomStart = new THREE.Vector2(),
      _zoomEnd = new THREE.Vector2(),
      _touchZoomDistanceStart = 0,
      _touchZoomDistanceEnd = 0,
      _panStart = new THREE.Vector2(),
      _panEnd = new THREE.Vector2(); // for reset


  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.up0 = this.object.up.clone();
  this.zoom0 = this.object.zoom; // events

  var changeEvent = {
    type: 'change'
  };
  var startEvent = {
    type: 'start'
  };
  var endEvent = {
    type: 'end'
  }; // methods

  this.handleResize = function () {
    var box = scope.domElement.getBoundingClientRect(); // adjustments come from similar code in the jquery offset() function

    var d = scope.domElement.ownerDocument.documentElement;
    scope.screen.left = box.left + window.pageXOffset - d.clientLeft;
    scope.screen.top = box.top + window.pageYOffset - d.clientTop;
    scope.screen.width = box.width;
    scope.screen.height = box.height;
  };

  var getMouseOnScreen = function () {
    var vector = new THREE.Vector2();
    return function getMouseOnScreen(pageX, pageY) {
      vector.set((pageX - scope.screen.left) / scope.screen.width, (pageY - scope.screen.top) / scope.screen.height);
      return vector;
    };
  }();

  var getMouseOnCircle = function () {
    var vector = new THREE.Vector2();
    return function getMouseOnCircle(pageX, pageY) {
      vector.set((pageX - scope.screen.width * 0.5 - scope.screen.left) / (scope.screen.width * 0.5), (scope.screen.height + 2 * (scope.screen.top - pageY)) / scope.screen.width // screen.width intentional
      );
      return vector;
    };
  }();

  this.rotateCamera = function () {
    var axis = new THREE.Vector3(),
        quaternion = new THREE.Quaternion(),
        eyeDirection = new THREE.Vector3(),
        objectUpDirection = new THREE.Vector3(),
        objectSidewaysDirection = new THREE.Vector3(),
        moveDirection = new THREE.Vector3(),
        angle;
    return function rotateCamera() {
      moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
      angle = moveDirection.length();

      if (angle) {
        _eye.copy(scope.object.position).sub(scope.target);

        eyeDirection.copy(_eye).normalize();
        objectUpDirection.copy(scope.object.up).normalize();
        objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();
        objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
        objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);
        moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));
        axis.crossVectors(moveDirection, _eye).normalize();
        angle *= scope.rotateSpeed;
        quaternion.setFromAxisAngle(axis, angle);

        _eye.applyQuaternion(quaternion);

        scope.object.up.applyQuaternion(quaternion);

        _lastAxis.copy(axis);

        _lastAngle = angle;
      } else if (!scope.staticMoving && _lastAngle) {
        _lastAngle *= Math.sqrt(1.0 - scope.dynamicDampingFactor);

        _eye.copy(scope.object.position).sub(scope.target);

        quaternion.setFromAxisAngle(_lastAxis, _lastAngle);

        _eye.applyQuaternion(quaternion);

        scope.object.up.applyQuaternion(quaternion);
      }

      _movePrev.copy(_moveCurr);
    };
  }();

  this.zoomCamera = function () {
    var factor;

    if (_state === STATE.TOUCH_ZOOM_PAN) {
      factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
      _touchZoomDistanceStart = _touchZoomDistanceEnd;

      if (scope.object.isPerspectiveCamera) {
        _eye.multiplyScalar(factor);
      } else if (scope.object.isOrthographicCamera) {
        scope.object.zoom *= factor;
        scope.object.updateProjectionMatrix();
      } else {
        console.warn('THREE.TrackballControls: Unsupported camera type');
      }
    } else {
      factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * scope.zoomSpeed;

      if (factor !== 1.0 && factor > 0.0) {
        if (scope.object.isPerspectiveCamera) {
          _eye.multiplyScalar(factor);
        } else if (scope.object.isOrthographicCamera) {
          scope.object.zoom /= factor;
          scope.object.updateProjectionMatrix();
        } else {
          console.warn('THREE.TrackballControls: Unsupported camera type');
        }
      }

      if (scope.staticMoving) {
        _zoomStart.copy(_zoomEnd);
      } else {
        _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
      }
    }
  };

  this.panCamera = function () {
    var mouseChange = new THREE.Vector2(),
        objectUp = new THREE.Vector3(),
        pan = new THREE.Vector3();
    return function panCamera() {
      mouseChange.copy(_panEnd).sub(_panStart);

      if (mouseChange.lengthSq()) {
        if (scope.object.isOrthographicCamera) {
          var scale_x = (scope.object.right - scope.object.left) / scope.object.zoom / scope.domElement.clientWidth;
          var scale_y = (scope.object.top - scope.object.bottom) / scope.object.zoom / scope.domElement.clientWidth;
          mouseChange.x *= scale_x;
          mouseChange.y *= scale_y;
        }

        mouseChange.multiplyScalar(_eye.length() * scope.panSpeed);
        pan.copy(_eye).cross(scope.object.up).setLength(mouseChange.x);
        pan.add(objectUp.copy(scope.object.up).setLength(mouseChange.y));
        scope.object.position.add(pan);
        scope.target.add(pan);

        if (scope.staticMoving) {
          _panStart.copy(_panEnd);
        } else {
          _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(scope.dynamicDampingFactor));
        }
      }
    };
  }();

  this.checkDistances = function () {
    if (!scope.noZoom || !scope.noPan) {
      if (_eye.lengthSq() > scope.maxDistance * scope.maxDistance) {
        scope.object.position.addVectors(scope.target, _eye.setLength(scope.maxDistance));

        _zoomStart.copy(_zoomEnd);
      }

      if (_eye.lengthSq() < scope.minDistance * scope.minDistance) {
        scope.object.position.addVectors(scope.target, _eye.setLength(scope.minDistance));

        _zoomStart.copy(_zoomEnd);
      }
    }
  };

  this.update = function () {
    _eye.subVectors(scope.object.position, scope.target);

    if (!scope.noRotate) {
      scope.rotateCamera();
    }

    if (!scope.noZoom) {
      scope.zoomCamera();
    }

    if (!scope.noPan) {
      scope.panCamera();
    }

    scope.object.position.addVectors(scope.target, _eye);

    if (scope.object.isPerspectiveCamera) {
      scope.checkDistances();
      scope.object.lookAt(scope.target);

      if (lastPosition.distanceToSquared(scope.object.position) > EPS) {
        scope.dispatchEvent(changeEvent);
        lastPosition.copy(scope.object.position);
      }
    } else if (scope.object.isOrthographicCamera) {
      scope.object.lookAt(scope.target);

      if (lastPosition.distanceToSquared(scope.object.position) > EPS || lastZoom !== scope.object.zoom) {
        scope.dispatchEvent(changeEvent);
        lastPosition.copy(scope.object.position);
        lastZoom = scope.object.zoom;
      }
    } else {
      console.warn('THREE.TrackballControls: Unsupported camera type');
    }
  };

  this.reset = function () {
    _state = STATE.NONE;
    _keyState = STATE.NONE;
    scope.target.copy(scope.target0);
    scope.object.position.copy(scope.position0);
    scope.object.up.copy(scope.up0);
    scope.object.zoom = scope.zoom0;
    scope.object.updateProjectionMatrix();

    _eye.subVectors(scope.object.position, scope.target);

    scope.object.lookAt(scope.target);
    scope.dispatchEvent(changeEvent);
    lastPosition.copy(scope.object.position);
    lastZoom = scope.object.zoom;
  }; // listeners


  function onPointerDown(event) {
    if (scope.enabled === false) return;

    switch (event.pointerType) {
      case 'mouse':
      case 'pen':
        onMouseDown(event);
        break;
      // TODO touch
    }
  }

  function onPointerMove(event) {
    if (scope.enabled === false) return;

    switch (event.pointerType) {
      case 'mouse':
      case 'pen':
        onMouseMove(event);
        break;
      // TODO touch
    }
  }

  function onPointerUp(event) {
    if (scope.enabled === false) return;

    switch (event.pointerType) {
      case 'mouse':
      case 'pen':
        onMouseUp(event);
        break;
      // TODO touch
    }
  }

  function keydown(event) {
    if (scope.enabled === false) return;
    window.removeEventListener('keydown', keydown);

    if (_keyState !== STATE.NONE) {
      return;
    } else if (event.keyCode === scope.keys[STATE.ROTATE] && !scope.noRotate) {
      _keyState = STATE.ROTATE;
    } else if (event.keyCode === scope.keys[STATE.ZOOM] && !scope.noZoom) {
      _keyState = STATE.ZOOM;
    } else if (event.keyCode === scope.keys[STATE.PAN] && !scope.noPan) {
      _keyState = STATE.PAN;
    }
  }

  function keyup() {
    if (scope.enabled === false) return;
    _keyState = STATE.NONE;
    window.addEventListener('keydown', keydown, false);
  }

  function onMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    if (_state === STATE.NONE) {
      switch (event.button) {
        case scope.mouseButtons.LEFT:
          _state = STATE.ROTATE;
          break;

        case scope.mouseButtons.MIDDLE:
          _state = STATE.ZOOM;
          break;

        case scope.mouseButtons.RIGHT:
          _state = STATE.PAN;
          break;

        default:
          _state = STATE.NONE;
      }
    }

    var state = _keyState !== STATE.NONE ? _keyState : _state;

    if (state === STATE.ROTATE && !scope.noRotate) {
      _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));

      _movePrev.copy(_moveCurr);
    } else if (state === STATE.ZOOM && !scope.noZoom) {
      _zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));

      _zoomEnd.copy(_zoomStart);
    } else if (state === STATE.PAN && !scope.noPan) {
      _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));

      _panEnd.copy(_panStart);
    }

    scope.domElement.ownerDocument.addEventListener('pointermove', onPointerMove, false);
    scope.domElement.ownerDocument.addEventListener('pointerup', onPointerUp, false);
    scope.dispatchEvent(startEvent);
  }

  function onMouseMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();
    var state = _keyState !== STATE.NONE ? _keyState : _state;

    if (state === STATE.ROTATE && !scope.noRotate) {
      _movePrev.copy(_moveCurr);

      _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
    } else if (state === STATE.ZOOM && !scope.noZoom) {
      _zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
    } else if (state === STATE.PAN && !scope.noPan) {
      _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
    }
  }

  function onMouseUp(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();
    _state = STATE.NONE;
    scope.domElement.ownerDocument.removeEventListener('pointermove', onPointerMove);
    scope.domElement.ownerDocument.removeEventListener('pointerup', onPointerUp);
    scope.dispatchEvent(endEvent);
  }

  function mousewheel(event) {
    if (scope.enabled === false) return;
    if (scope.noZoom === true) return;
    event.preventDefault();
    event.stopPropagation();

    switch (event.deltaMode) {
      case 2:
        // Zoom in pages
        _zoomStart.y -= event.deltaY * 0.025;
        break;

      case 1:
        // Zoom in lines
        _zoomStart.y -= event.deltaY * 0.01;
        break;

      default:
        // undefined, 0, assume pixels
        _zoomStart.y -= event.deltaY * 0.00025;
        break;
    }

    scope.dispatchEvent(startEvent);
    scope.dispatchEvent(endEvent);
  }

  function touchstart(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (event.touches.length) {
      case 1:
        _state = STATE.TOUCH_ROTATE;

        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

        _movePrev.copy(_moveCurr);

        break;

      default:
        // 2 or more
        _state = STATE.TOUCH_ZOOM_PAN;
        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
        var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

        _panStart.copy(getMouseOnScreen(x, y));

        _panEnd.copy(_panStart);

        break;
    }

    scope.dispatchEvent(startEvent);
  }

  function touchmove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {
      case 1:
        _movePrev.copy(_moveCurr);

        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

        break;

      default:
        // 2 or more
        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
        var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;

        _panEnd.copy(getMouseOnScreen(x, y));

        break;
    }
  }

  function touchend(event) {
    if (scope.enabled === false) return;

    switch (event.touches.length) {
      case 0:
        _state = STATE.NONE;
        break;

      case 1:
        _state = STATE.TOUCH_ROTATE;

        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));

        _movePrev.copy(_moveCurr);

        break;
    }

    scope.dispatchEvent(endEvent);
  }

  function contextmenu(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
  }

  this.dispose = function () {
    scope.domElement.removeEventListener('contextmenu', contextmenu, false);
    scope.domElement.removeEventListener('pointerdown', onPointerDown, false);
    scope.domElement.removeEventListener('wheel', mousewheel, false);
    scope.domElement.removeEventListener('touchstart', touchstart, false);
    scope.domElement.removeEventListener('touchend', touchend, false);
    scope.domElement.removeEventListener('touchmove', touchmove, false);
    scope.domElement.ownerDocument.removeEventListener('pointermove', onPointerMove, false);
    scope.domElement.ownerDocument.removeEventListener('pointerup', onPointerUp, false);
    window.removeEventListener('keydown', keydown, false);
    window.removeEventListener('keyup', keyup, false);
  };

  this.domElement.addEventListener('contextmenu', contextmenu, false);
  this.domElement.addEventListener('pointerdown', onPointerDown, false);
  this.domElement.addEventListener('wheel', mousewheel, false);
  this.domElement.addEventListener('touchstart', touchstart, false);
  this.domElement.addEventListener('touchend', touchend, false);
  this.domElement.addEventListener('touchmove', touchmove, false);
  this.domElement.ownerDocument.addEventListener('pointermove', onPointerMove, false);
  this.domElement.ownerDocument.addEventListener('pointerup', onPointerUp, false);
  window.addEventListener('keydown', keydown, false);
  window.addEventListener('keyup', keyup, false);
  this.handleResize(); // force an update at start

  this.update();
};

THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45629" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dependencies/TrackballControls.js"], null)
//# sourceMappingURL=/TrackballControls.a97395b8.js.map