'use strict';

/* Controllers */

angular.module('fuselageMaker.controllers', []).
controller('MyCtrl1', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope) {

$scope.Math = window.Math;


$scope.set_xy_click = function(element) {
  element.x = $scope.theX;
  element.y = $scope.theY;
};
$scope.set_xy_arc_click = function(element) {
  element.push({x:$scope.theX, y:$scope.theY});
};
$scope.op_seq = [];
$scope.show_plan_image = true;

$scope.sst = {
  side: {
    zone: {
      lower_left: {
        instruct: 'Click lower left corner of side view box zone',
        x: null,
        y: null,
      },
      upper_right: {
        instruct: 'Click upper right corner of side view box zone',
        x: null,
        y: null,
      }
    },
    reference_line: {
      nose: {
        instruct: 'Click on nose end of side reference line',
        x: null,
        y: null
      },
      tail: {
        instruct: 'Click on tail end of side reference line',
        x: null,
        y: null
      }
    },
    top_outline: [],
    bottom_outline: []
  },
  top: {
    zone: {
      lower_left: {
        instruct: 'Click lower left corner of top/bottom view box zone',
        x: null,
        y: null
      },
      upper_right: {
        instruct: 'Click upper right corner of top/bottom view box zone',
        x: null,
        y: null
      }
    },
    reference_line: {
      nose: {
        instruct: 'Click on nose end of top/bottom reference line',
        x: null,
        y: null
      },
      tail: {
        instruct: 'Click on tail end of top/bottom reference line',
        x: null,
        y: null
      },
    },
    left_outline: [],
    right_outline: []
  },
  xsecs: [],
  bulkheads: []
};

$scope.safe_apply = function() {
  if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
  }
}

$scope.undo_point = function() {
  var throw_away = $scope.undoable.pop();
};

$scope.set_plan_image = function(image_file) {
  $scope.sst.plan_image = image_file;
};

$scope.proc_op_seq = function() {
  $scope.instruction = "";
  if (!$scope.get_coord_live) {
    clearInterval($scope.get_coord_interval);
    $scope.safe_apply();
    return;
  }
  if ($scope.op_seq.length === 0) {
    if ($scope.get_coord_live) {
      clearInterval($scope.get_coord_interval);
      $scope.get_coord_live = false;
    }
    $scope.safe_apply();
    return;
  }
  $scope.instruction = $scope.op_seq[0].instruction;
  if($scope.coord_available) {
    if ($scope.op_seq[0].is_loop) {
      $scope.op_seq[0].handler($scope.op_seq[0].dest,$scope.op_seq[0].index);
    } else {
      $scope.op_seq[0].handler($scope.op_seq[0].dest);
      $scope.op_seq.shift();
    }
    $scope.coord_available = false;
  }
  $scope.safe_apply();
}

$scope.set_box = function(element) {
  $scope.is_dirty = true;
  element.lower_left.x = null; element.lower_left.y = null;
  element.upper_right.x = null;element.upper_right.y = null;
  $scope.coord_available = false;
  $scope.op_seq = [];
  $scope.op_seq.push({
    handler: $scope.set_xy_click,
    dest: element.lower_left,
    is_loop: false,
    instruction: element.lower_left.instruct
  });
  $scope.op_seq.push({
    handler: $scope.set_xy_click,
    dest: element.upper_right,
    is_loop: false,
    instruction: element.upper_right.instruct
  });
  $scope.get_coord_interval = setInterval($scope.proc_op_seq, 500);
  $scope.get_coord_live = true;
}

$scope.set_line = function(element) {
  $scope.is_dirty = true;
  element.nose.x = null; element.nose.y = null;
  element.tail.x = null; element.tail.y = null;
  $scope.coord_available = false;
  $scope.op_seq = [];
  $scope.op_seq.push({
    handler: $scope.set_xy_click,
    dest: element.nose,
    is_loop: false,
    instruction: element.nose.instruct
  });
  $scope.op_seq.push({
    handler: $scope.set_xy_click,
    dest: element.tail,
    is_loop: false,
    instruction: element.tail.instruct
  });
  $scope.get_coord_interval = setInterval($scope.proc_op_seq, 500);
  $scope.get_coord_live = true;
}

$scope.set_arc = function(element, clean) {
  $scope.undoable = element;
  $scope.show_done_button = true;
  $scope.is_dirty = true;
  for (var i=element.length;i>=0;i--) {
    element.pop();
  }
  $scope.coord_available = false; // turn off any existing point gathering
  if (clean) {
    $scope.op_seq = [];
  }
  $scope.op_seq.push({
    handler:$scope.set_xy_arc_click,
    dest: element,
    is_loop: true,
    instruction: 'Click to add new point. Click done button when done.'
  });
  $scope.get_coord_interval = setInterval($scope.proc_op_seq, 500);
  $scope.get_coord_live = true;
};

$scope.set_point_and_arc = function(point, arc) {
  $scope.is_dirty = true;
  $scope.op_seq = [];
  $scope.op_seq.push({
    handler:$scope.set_xy_click,
    dest: point,
    is_loop: false,
    instruction: 'Click to position cross-section on reference line.'
  });
  $scope.set_arc(arc, false);
};
$scope.save_data = function() {
  localStorage.setItem('fuselage', JSON.stringify($scope.sst) );
};
$scope.restore_data = function() {
  var do_it = true;
  if ($scope.is_dirty) {
    if (!window.confirm("You have made changes.  Are you sure you want to restore on top of your changes?")) {
      do_it = false;
    }
  }
  if (do_it) {
    $scope.sst = JSON.parse(localStorage.getItem('fuselage') );
    $scope.safe_apply();
  }
};
$scope.destroy_xsecs = function() {
  if ($scope.sst.xsecs.length == 1) {
    if (window.confirm('Are you sure you want to destroy the cross section?')) {
      $scope.sst.xsecs = [];
    }
  } else if ($scope.sst.xsecs.length > 1) {
    if (window.confirm('Are you sure you want to destroy all ' +$scope.sst.xsecs.length + ' cross sections?')) {
      $scope.sst.xsecs = [];
    }
  }
};

$scope.window_width = function(){
   return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
};
$scope.window_height = function(){
   return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
};

$scope.locate_toolbox = function()  {
  var left = $scope.window_width() - $scope.tool_box_width + "px";
  var top = 0 + "px";
  $scope.tool_box.style.left = left;
  $scope.tool_box.style.top = top;

};

$scope.click_on_image = function(event) {
  var xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)
    - document.getElementById('the-svg').offsetLeft;
  var yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop)
    - document.getElementById('the-svg').offsetTop;
  $scope.theX = event.clientX + xOffset;
  $scope.theY = event.clientY + yOffset;
  $scope.coord_available = true;
};

$scope.is_dirty = false;
$scope.show_done_button = false;
$scope.set_plan_image("img/p51_side.jpg");
$scope.non_modal_shown = true;
$scope.tool_box = document.getElementById('the-toolbox');
$scope.tool_box_width = 300;
$scope.tool_box_height = 500;

}])
.controller('MyCtrl2', [function() {

}]);
