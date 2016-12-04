# FuselageMaker 0.06a
CAD tool for designing model airplane fuselages. Written in AngularJS 1.2

Access this online by going here: https://rawgit.com/marlin-mixon/FuselageMaker/master/index.html

Warning, this is currently alpha-grade software and as such it may not be fully usable yet.  If you intend to proceed, please carefully read the following sections.

## Fixes/enhancements:
12/4/2016 - Version 0.06a
Features -
- Added ability to relieve bulkheads for sheeting having a constant thickness and to remove the center for rubber clearence.

Bug fixes -
- Fixed issue where saving bulkhead SVG file was no longer possible.

12/1/2016
Bug fixes - 
- 1. Fixed bug where erroneous message was reported after creating a cross section. The error said that the initial point was not created in the side nor top view.
- 2. Fixed xsec creation issue where if your initial locating point was outside the side or top view it would continue with accepting points anyway.  Now it terminates the xsec creation.
Ability to zoom in and out so you can capture fine detail.

## Upcoming enhancements:
Stringer notches

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

- 4. Always digitize only half of the cross-section and only the port side as viewed from the front.  We want to see Backwards c's. If you DO need to create a starboard-side cross section, be sure to run "Other Commands"->"Model Integrity Check" and any reversed cross sections will be automatically detected and mirrored.  

##Work flow:
- 1. Generally, the menu should be followed from left to right, top to bottom, i.e. do "Define Side View" first followed by "Define top/bottom view" etc.  Many things can be done out of order but you must have all of the side and top outlines done before you create cross sections and you must have cross sections before you can digitize bulkhead locations.
- 2. Quick save saves only one fuselage at a time.  It kills whatever previously existed.
- 3. Save to a file writes to fuselage.json only. It is placed in your browser's download directory.  You can manually rename this file and later read it back into FuselageMaker using it's new name.
- 4. "Save Bulkheads to a File" only writes to bulkheads.svg (browser download directory).  Bulkheads.svg can then be read into any program that reads SVG files including Inkscape and Corel Draw.

##Known bugs
- 1. Limitation on left facing fuselages only.  This is considered a bug and should be fixed.
