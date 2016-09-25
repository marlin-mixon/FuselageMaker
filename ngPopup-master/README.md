#ngPopup
-----

Light-weight (~3kb gzipped) modaless dialog for Angular without jQuery dependency, supports two-way binding for most dialog properties(width, height, position...), and has full customized theme.

[Demo]

[API]
##Install

Install through Bower or NPM, 
```
bower install ng-popup -S
```
```
npm install ng-popup -S
```
Include it in your html page :

```html
<link rel='stylesheet' href='ngPopup.css'>
<script type='text/javascript' src='ngPopup.js'></script>
```


Then add dependency in your AngularJS App :
```javascript
angular.module("yourApp",["ngPopup"]);
```

##Build
ngPopup use Gulp to release , make sure to run gulp after modified the source code or theme,
```
gulp
```
##Quick-start Example

1 Insert ngPopup directive in DOM, and specify option object by ```option``` attribute :
```html
<ng-pop-up option='ngPopupConfig'></ng-pop-up>
```
2 Define configurations in controller :

```javascript
$scope.ngPopupConfig = {
    width: $scope.inputWidth,
    height:$scope.inputHeight,
    templateUrl:"../views/ngPopupContents.html",
    resizable:true,
    draggable:true,
    position: { top : 500, left : 500},
    onOpen: function(){
    	/*Some Logic...*/
    }
}
```

##Two-way Binding  


in ngPopup, the following properties support angular two-way binding (visit Wiki page for full properties list):  
* position
* width
* height
* title
* show/hide
* draggable
* resizable  
see the two-way binding example in [Demo] page

##License
The MIT License

[download]:https://github.com/MarkoCen/ngPopup/tree/master/dist
[AngularJS]:https://angularjs.org/
[Demo]:http://markocen.github.io/ngPopup/ngPopupDemo.html
[API]:https://github.com/MarkoCen/ngPopup/wiki/API-:-Options
