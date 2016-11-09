# FuselageMaker 0.02a
CAD tool for designing model airplane fuselages. Written in AngularJS 1.2

Access this online by going here: https://rawgit.com/marlin-mixon/FuselageMaker/master/index.html

Warning, this is currently alpha-grade software so it may not be fully usable yet.  If you intend to proceed, please carefully read the following sections.

##Limitations:
- 1. This only lets you model fuselages that have bilateral symmetry when viewed from the top and front.  (I've not seen an airplane where this is not the case. Even asymmetric aircraft like the Rutan Boomerang or the German Blohm & Voss Bv-141 seem to have symmetrical fuselages.)
- 2. Your source 3-views need to have top or bottom views, side views and cross sections. And these must all be at the same scale.  This is fairly common.
- 3. The 3-view's cross sections must be vertical as viewed from the front, i.e. not angled or sideways.  It's OK if they are 'concentric', i.e. all on top of each other.  
- 4. This works with Chrome and Firefox. Not sure about Internet Explorer nor Edge as I don't have them.
- 5. All cross sections and bulkheads must be vertical as viewed from the side.
- 6. currently can only properly use side views that face towards the left.  

##To be successful with this you will have to have to adhere closely to the following rules:
- 1. Always digitize (trace) the cross sections from top to bottom.

![Cross Section] (img/crsc.png)
- 2. Always digitize only half of the cross-section and only the port side as viewed from the front.  We want to see Backwards c's.
- 3. The side and top views must be digitized from nose to tail. Also each successive point you add must get closer to the tail--no backtracking.  So just be sure features like a floatplane's step doesn't trace back on itself.  If the cross sections show the canopy then digitize the canopy.  If the cross sections omit the canopy then don't digitize it in the side view. For the top/bottom view, you only need to digitize the left side as viewed from the rear. (The right side is currently ignored)
![Side view] (img/Sideview.jpg)
- 4. The reference lines must also be digitized from nose to tail. Additionally, the point at the nose of the side view reference line must be the same point at the nose of the top/bottom view center line.  That's important! So be sure if the first point of your reference line starts at the tip of the spinner on the side view that it also starts at the tip of the spinner on the top/bottom view.

##Work flow:
- 1. When you first start FuselageMaker, it may appear to not work because your browser is not letting FuselageMaker create its toolbox (window with menu)  Look for a warning message at the top of your browser and click the allow button to get started.
- 2. Generally, the menu should be followed from left to right, top to bottom, i.e. do "Define Side View" first followed by "Define top/bottom view" etc.  Many things can be done out of order but you must have all of the side and top outlines done before you create cross sections and you must have cross sections before you can digitize bulkhead locations.
- 3. Quick save saves only one fuselage at a time.  It kills whatever previously existed.
- 4. Save to a file writes to fuselage.json only. It is placed in your browser's download directory.  You can manually rename this file and later read it back into FuselageMaker using it's new name.
- 5. "Save Bulkheads to a File" only writes to bulkheads.svg (browser download directory).  Bulkheads.svg can then be read into any program that reads SVG files including Inkscape and Corel Draw.

##Setting Fuselage Maker for Best Ergonomics
- 1. Launch FuselageMaker if you haven't already.
- 2. Make sure your browser window isn't maximized and drag it's width so it's as wide as it gets while still having the full width visible on the screen.
- 3. Drag the browser down so the bottom of the window is at the bottom of your screen.
- 4. Grab the top right resize control and Drag the height so you have the browser occupying about 60-80% of the bottom of the screen and the top is open.
- 5, Now for the cool part: look for the tab to the right of the FuselageMaker tab and click on it and drag it straight up.  The window will separate from the browser and occupy the top half of the screen.  Resize the top browser so the bottom touches the top of the browser below.
- 6. Test the menu so you are sue you can access all the features.  Adjust the sizes of the browsers as required.
- 7. One of the reasons for multiple browser windows is so you can take advantage of the browser zoom feature.  You can press shift-+ in the lower browser multiple times to zoom in on the drawing to make your digitizing much more accurate.  To zoom back out press shift-minus as desired.  With the multiple windows the toolbox menu is static and remains unzoomed.

##Known bugs
- 1. All menu items fire twice.  This is a complication that arises from running the toolkit menubar in a separate window.  It causes error messages to pop up twice.  Other than that the main functionality is OK.
- 2. Limitation on left facing fuselages only.  This is considered a bug and should be fixed.
