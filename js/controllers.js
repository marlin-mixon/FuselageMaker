'use strict';

/* Controllers */

angular.module('fuselageMaker.controllers', []).
controller('MyCtrl1', ['$scope', '$q', function($scope, $q) {

$scope.Math = window.Math;


$scope.set_xy_click = function(element) {
  element.x = $scope.theX;
  element.y = $scope.theY;
};
$scope.set_xy_arc_click = function(element) {
  element.push({x:$scope.theX, y:$scope.theY});
};
$scope.op_seq = [];
$scope.op_arc = [];

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
  }  
};

$scope.ngPopupConfig = {
    width: 200,
    height:350,
    templateUrl:"partials/floatingMenu.html",
    resizable:false,
    draggable:true,
    isMinimized:false,
    position: { top : 0, left : 0},
    onOpen: function(){
        /*Some Logic...*/
    }
}

$scope.proc_op_seq = function() {
  if ($scope.op_seq.length === 0) {
    if ($scope.get_coord_live) {
      clearInterval($scope.get_coord_interval);
      $scope.get_coord_live = false;
    }
    if ($scope.instruction !== "") {
      $scope.instruction = "";
    }
    return;
  }
  $scope.instruction = $scope.op_seq[0].instruction;
  if($scope.op_seq[0].have_coords) {
    $scope.op_seq[0].call($scope.op_seq[0].arg);
    $scope.op_seq.shift();
  }
  $scope.$apply();
}

$scope.proc_op_arc = function() {
  if ($scope.stop_arc) {
    if ($scope.get_coord_live) {
      clearInterval($scope.get_coord_interval);
      $scope.get_coord_live = false;
    }
    if ($scope.instruction !== "") {
      $scope.instruction = "";
    }
    return;
  }
  $scope.instruction = "Click to add point. Double-click to stop";
  $scope.op_arc[0].call($scope.op_arc[0].arg);
  $scope.$apply();
}

$scope.set_box = function(element) {
  element.lower_left.x = null; element.lower_left.y = null;
  element.upper_right.x = null;element.upper_right.y = null;
  $scope.op_seq.push({
    call:$scope.set_xy_click,
    arg:element.lower_left,
    have_coords:false,
    instruction:element.lower_left.instruct
  }); 
  $scope.op_seq.push({
    call:$scope.set_xy_click,
    arg:element.upper_right,
    have_coords:false,
    instruction:element.upper_right.instruct
  });
  $scope.get_coord_interval = setInterval($scope.proc_op_seq, 500);
  $scope.get_coord_live = true;
}

$scope.set_line = function(element) {
  element.nose.x = null; element.nose.y = null;
  element.tail.x = null; element.tail.y = null;
  $scope.op_seq.push({
    call:$scope.set_xy_click,
    arg:element.nose,
    have_coords:false,
    instruction:element.nose.instruct
  }); 
  $scope.op_seq.push({
    call:$scope.set_xy_click,
    arg:element.tail,
    have_coords:false,
    instruction:element.tail.instruct
  });
  $scope.get_coord_interval = setInterval($scope.proc_op_seq, 500);
  $scope.get_coord_live = true;
}

$scope.set_arc = function(element) {
  $scope.stop_arc = false;
  $scope.op_arc.push({
    call:$scope.set_xy_arc_click,
    arg:element
  });  
  $scope.get_coord_interval = setInterval($scope.proc_op_arc, 500);
  $scope.get_coord_live = true;
}

$scope.click_on_image = function(event) {

  var xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft) 
    - document.getElementById('the-svg').offsetLeft;
  var yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop)  
    - document.getElementById('the-svg').offsetTop;
  if ($scope.get_coord_live) {
    $scope.theX = event.clientX + xOffset;
    $scope.theY = event.clientY + yOffset;
    if ($scope.op_seq.length > 0) {
      $scope.op_seq[0].have_coords = true;
    }
  }
};


}])
.controller('MyCtrl2', [function() {

}]);