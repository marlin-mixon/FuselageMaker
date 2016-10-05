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
  if ($scope.undoable) {
    var throw_away = $scope.undoable.pop();
  }
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
  $scope.set_display('done-button', true);
  $scope.set_display('undo-button', true);
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

$scope.set_bulkhead_arc = function(element, side, top) {
  // Make another version of set_arc that transforms the points depending on which view they came from
  $scope.set_arc(element, true);
}

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
    if (window.confirm('Are you sure you want to destroy all ' + $scope.sst.xsecs.length + ' cross sections?')) {
      $scope.sst.xsecs = [];
    }
  }
};
$scope.is_empty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
};

$scope.get_tmx_horizontal = function(point_a, point_b) {
  var angle = Math.atan2(point_b.y - point_a.y, point_b.x - point_a.x);
  var theta = -angle;
  var costh = Math.cos(theta);
  var sinth = Math.sin(theta);
  var tmx = [];
  tmx[0] = [costh,  sinth, 0];
  tmx[1] = [-sinth, costh, 0];
  tmx[2] = [0,      0,     1];
  theta = angle;
  // costh = costh; // Trig identity for neg angles
  sinth = -sinth;   // Trig identity for neg angles
  inv_tmx[0] = [costh,  sinth, 0];
  inv_tmx[1] = [-sinth, costh, 0];
  inv_tmx[2] = [0,      0,     1];
  return {tmx: tmx, inv_tmx: inv_tmx};
};

$scope.model_integrity_check = function(obj, obj2) {
  obj2.side = $scope.orthofix_ref_line(obj.side, obj2.side);
  obj2.top = $scope.orthofix_ref_line(obj.top, obj2.top);
  $scope.clean_up_xsecs();
};

$scope.orthofix_ref_line = function(obj, obj2) {
  var tmx = ( $scope.get_tmx_horizontal(obj.reference_line.nose, obj.reference_line.tail) ).tmx;  // ignore inv_tmx
  var rot_point_nose = [[obj.reference_line.nose.x],[obj.reference_line.nose.y],[1]];
  var rot_point_tail = [[obj.reference_line.tail.x],[obj.reference_line.tail.y],[1]];
  var rotatd_nose = math.multiply(tmx, rot_point_nose);
  var rotatd_tail = math.multiply(tmx, rot_point_tail);
  obj2 = {
           tmx: tmx,
           reference_line: {
             nose: {
               x: rotatd_nose[0][0],
               y: rotatd_nose[1][0]
             },
             tail: {
               x: rotatd_nose[0][0],
               y: rotatd_nose[1][0]
             }
           }
        };
  return obj2;
};

$scope.clean_up_xsecs = function() {
  $scope.is_dirty = true;
  var i;
  if ($scope.sst.xsecs.length === 0) {
    alert("You don't have any cross sections defined.");
    return;
  }
  for (i=$scope.sst.xsecs.length-1;i>=0;i--) {
    if ($scope.is_empty($scope.sst.xsecs[i].station) || $scope.sst.xsecs[i].xsec.length === 0) {
      $scope.sst.xsecs.splice(i,1);
    }
  }
  if (!$scope.sst.side.zone.length === 2) {
    alert("You don't have a side zone box defined (or it's improperly formed). Fix this and run this clean up again and it will be more thorough.");
    return;
  }
  if (!$scope.sst.top.zone.length === 2) {
    alert("You don't have a top zone box defined (or it's improperly formed). Fix this and run this clean up again and it will be more thorough.");
    return;
  }
  for (i=$scope.sst.xsecs.length-1;i>=0;i--) {
    if (  // Make sure station point is in one of the side or top zone boxes
       ($scope.sst.xsecs[i].station.x >= $scope.sst.side.zone.lower_left.x &&
        $scope.sst.xsecs[i].station.x <= $scope.sst.side.zone.upper_right.x &&
        $scope.sst.xsecs[i].station.y >= $scope.sst.side.zone.upper_right.y &&
        $scope.sst.xsecs[i].station.y <= $scope.sst.side.zone.lower_left.y)
        ||
       ($scope.sst.xsecs[i].station.x >= $scope.sst.top.zone.lower_left.x &&
        $scope.sst.xsecs[i].station.x <= $scope.sst.top.zone.upper_right.x &&
        $scope.sst.xsecs[i].station.y >= $scope.sst.top.zone.upper_right.y &&
        $scope.sst.xsecs[i].station.y <= $scope.sst.top.zone.lower_left.y)
       )
       {
         // It's good!
       } else {
         $scope.sst.xsecs.splice(i,1);
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
  // Firefox needs to use getBoundingClientRect().left instead of offsetLeft and offsetTop
  var xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)
    - document.getElementById('the-svg').getBoundingClientRect().left;
  var yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop)
    - document.getElementById('the-svg').getBoundingClientRect().top;
  $scope.theX = event.clientX + xOffset;
  $scope.theY = event.clientY + yOffset;
  $scope.coord_available = true;
};

$scope.set_display = function(the_id, is_showable) {
  var display;
  if (is_showable) {
    display = 'block';
  } else {
    display = 'none';
  }
  if ($window.document.getElementById(the_id) !== null) {
    $window.document.getElementById(the_id).style.display = display;
  } else {
    $rootScope.window.document.getElementById(the_id).style.display = display;
  }
};

$scope.initialize_toolbox = function() {
  $scope.set_display('undo-button', $scope.show_undo_button);
  $scope.set_display('done-button', $scope.show_done_button)
};

$scope.is_dirty = false;
$scope.show_done_button = false;
$scope.show_undo_button = false;
$scope.m = {};
$scope.set_plan_image("img/p51_side.jpg");
$scope.non_modal_shown = true;
$scope.tool_box = document.getElementById('the-toolbox');
$scope.tool_box_width = 300;
$scope.tool_box_height = 500;
}])
.controller('MyCtrl2', [function() {

}]);
