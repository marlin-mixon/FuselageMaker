# FuselageMaker 0.05a
CAD tool for designing model airplane fuselages. Written in AngularJS 1.2

Access this online by going here: https://rawgit.com/marlin-mixon/FuselageMaker/master/index.html

Warning, this is currently alpha-grade software and as such it may not be fully usable yet.  If you intend to proceed, please carefully read the following sections.

##Limitations:
- 1. This only lets you model fuselages that have bilateral symmetry when viewed from the top and front.  (I've not seen an airplane where this is not the case. Even asymmetric aircraft like the Rutan Boomerang or the German Blohm & Voss Bv-141 seem to have symmetrical fuselages.)
- 2. Your source 3-views need to have top or bottom views, side views and cross sections. And these must all be at the same scale.  This is fairly common.
- 3. The 3-view's cross sections must be vertical as viewed from the front, i.e. not angled or sideways.  It's OK if they are 'concentric', i.e. all on top of each other.  
- 4. This works with Chrome and Firefox. Not sure about Internet Explorer nor Edge as I don't have them.
- 5. All cross sections and bulkheads must be vertical as viewed from the side.
- 6. Currently can only properly use side views that face towards the left.  
- 7. Bulkhead output is limited to SVG only.  When more options such as adding stringer notches, etc. become available, new outputs such as DXF will be considered.

##To be successful with this you will have to have to adhere closely to the following rules:

- 1. The side and top views must be digitized from nose to tail. Also each successive point you add must get closer to the tail--no backtracking.  So just be sure features like a floatplane's step doesn't trace back on itself.  If the cross sections show the canopy then digitize the canopy.  If the cross sections omit the canopy then don't digitize it in the side view. For the top/bottom view, you only need to digitize the left side as viewed from the rear. (The right side is currently ignored)
![Side view] (img/Sideview.jpg)
![Anatomy of the Side View] (img/SideviewAnatomy.jpg)
- 2. The reference lines must also be digitized from nose to tail. Additionally, the point at the nose of the side view reference line must be the same point at the nose of the top/bottom view center line.  That's important! So be sure if the first point of your reference line starts at the tip of the spinner on the side view that it also starts at the tip of the spinner on the top/bottom view.
- 3. Always digitize (trace) the cross sections from top to bottom, clock-wise.  Your first click to create a cross section must be in the side view or top/bottom view.  This locates it fore and aft.  Subsequent clicks create the cross section's shape.

![Cross Section] (img/crsc.png)

- 4. Always digitize only half of the cross-section and only the port side as viewed from the front.  We want to see Backwards c's.

##Work flow:
- 1. When you first start FuselageMaker, it may appear to not work because your browser is not letting FuselageMaker create its toolbox (window with menu)  Look for a warning message at the top of your browser and click the allow button to get started.
- 2. Generally, the menu should be followed from left to right, top to bottom, i.e. do "Define Side View" first followed by "Define top/bottom view" etc.  Many things can be done out of order but you must have all of the side and top outlines done before you create cross sections and you must have cross sections before you can digitize bulkhead locations.
- 3. Quick save saves only one fuselage at a time.  It kills whatever previously existed.
- 4. Save to a file writes to fuselage.json only. It is placed in your browser's download directory.  You can manually rename this file and later read it back into FuselageMaker using it's new name.
- 5. "Save Bulkheads to a File" only writes to bulkheads.svg (browser download directory).  Bulkheads.svg can then be read into any program that reads SVG files including Inkscape and Corel Draw.

##Known bugs
- 1. Limitation on left facing fuselages only.  This is considered a bug and should be fixed.
- 2. Only way to zoom or scale up your drawing to record minute details right now is to use your browser's zoom (ctrl +, ctrl -).  This also blows up the menu making it harder to compete for screen real estate. Next version will have zoom-in and zoom-out buttons.
