/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var del = require('del');

var babelPluginModules = require('fbjs-scripts/babel-6/rewrite-modules');

var paths = {
  react: {
    src: [
      'src/**/*.js',
      '!src/**/__benchmarks__/**/*.js',
      '!src/**/__tests__/**/*.js',
      '!src/**/__mocks__/**/*.js',
      '!src/renderers/art/**/*.js',
      '!src/shared/vendor/**/*.js',
    ],
    lib: 'build/modules',
  },
};

var moduleMap = Object.assign(
  {'object-assign': 'object-assign'},
  require('fbjs/module-map'),
  {
    deepDiffer: 'react-native/lib/deepDiffer',
    deepFreezeAndThrowOnMutationInDev: 'react-native/lib/deepFreezeAndThrowOnMutationInDev',
    flattenStyle: 'react-native/lib/flattenStyle',
    InitializeJavaScriptAppEngine: 'react-native/lib/InitializeJavaScriptAppEngine',
    RCTEventEmitter: 'react-native/lib/RCTEventEmitter',
    TextInputState: 'react-native/lib/TextInputState',
    UIManager: 'react-native/lib/UIManager',
    UIManagerStatTracker: 'react-native/lib/UIManagerStatTracker',
    View: 'react-native/lib/View',
  }
);

var babelOpts = {
  plugins: [
    [babelPluginModules, { map: moduleMap }],
  ],
};

gulp.task('react:clean', function() {
  return del([paths.react.lib]);
});

gulp.task('react:modules', function() {
  return gulp
    .src(paths.react.src)
    .pipe(babel(babelOpts))
    .pipe(flatten())
    .pipe(gulp.dest(paths.react.lib));
});

gulp.task('default', ['react:modules']);
