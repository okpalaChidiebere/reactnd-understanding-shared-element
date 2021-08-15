# Understanding SharedElement Transition in React Native

- When chanigng the state of your UI, motion can helps you explain that change as well as focus your attention on the content that matters and Shared Element helps you achieve this
- SharedElements can help help you move states within a Screen and not just across screen boundries. Eg: You can have a screen as as modal with a transparent background and have it share transition from the modal screen parent page to the modal itself. This will have a illusion where the detail screen surface lifts off from the surface below to form its own screen.
- SharedElements helps provides continuity within different states of in your UI to create a more understandable experience. 

# Few Rules to Follow to get the best Shared Transition experience for your app
- Views that you want to share between two screens must have a unique id attribute that identifies them in Views. You can have the name of this id come from a string resource file or from the API data. eg Screen1 has a SharedElement of id `Strings.transition_item` and Screen2 should also have a SharedElement of id `Strings.transition_item` 
- If the Elements shared is a Text, it is important that the color as well number of lines the text is occupying be thesame. The fontSize of the text maybe not necessarity have to be exactly thesame but the difference in fontSize show not be too far away from each other. Eg looking as Demo2, The article title and subtitle has a bit of wonky transition because the text color and number of lines are different between pages. So don do that in a real app
- You can Views like Button, Text, Image and View. In addtion these views may need to have the `position: absolute` in their style respoectively for better transition
- The DetailScreen that the Mater Screen will share elements with can be a Modal Screen(with transparent, covered or opaque background. This helps potray the illusion of the detail screen lifting up from the listLitem to form its own surface from the Master screen) or it can be a regular screen as well(with noraml navigation transition animations)

# Kittens Items
- We added the card drag panHandler first
- Applied the nextStyle card
- Added logic for what to do in onPanResponderRelease
- Added Buttons to trigger the Card drag as well
- Add text(Nope/Yup) to Scale and fade in based on the x value (drag left or right)
- **TakeAways:** In onPanResponderRelease, based on upon distance(dx in our case) that have been dragged in a particular direction, you can the derive, actions to be taken. Whether it is reseting the animation, or doing a decay to do a throw. And. once the animation is complete, we do a transitionNext that either setup more animations or then setState to set up the next drag view
- We saw the power of interpolation. The Animated Library comes from interpolation. You are able to do interpolation on interpolations and it will still be reactive regarding of a timming or anything else that is triggering the animation. The output range of an interpolate can become the input range of another interpolate. When the animations are connected with interpolate it requires you to control a singular value and drive a range of animations. Meaning less work for us, and better animations.
- **Translate:** Translations operate like a grid, where 0,0 is the top left of the element. The Y piece will operate on the Y axis, go up and down/move top to bottom. The X will operate on X axis, go left to right. You may need to move item across the screen; whether it be in a drag or ani animating it across the screen before it disappear; the appropriate and most performant way to achieve this is to use translate. There are trade offs to using translate. Since it doesn't effect layout, the surrounding layouts won't be effected. For example if you wanted to move an item left or right and have another item fill in to it's spot, this won't happen. You would need to manually adjust the other elements in conjunction with the transform. In order to get this style of animation to work you'd have to animate layouts.
- In real project, consider using flatlists like in this [Youtube Video](https://www.youtube.com/watch?v=g5rCMlPTgrM) to stack the cards on top of each order


# Breaking down the Draggable Head animation
- There is a drag, but the elements besides the first one does not seem to be touchable. 
- There is a translateX and translateY that is happening. This means that we will use Animated.ValueXY for the top Head item and other items as well. 
- There is a stagger but however, when we talk about using stagger with drags, We will have to re-create the stagger that happens in the top items head for the other head items behind as well. 
- We dont see any opacity, scale, color, width, width, height. We just see only translateXY and the movement of the other heads to the exact animatedValue of the item in front.

**Thing to consider when looking at drag animation**
- **What happens when you pick up the item:** Does the View you are dragging stay where its at after being dragged? if so then we will likely use an extract offset. So with the PanResponder it will be the onPanResponderGrant
- **What happens while you are moving:** For the onPanResponderMove, if we are dragging a singular View, we could use just Animated.Event, but because we are dragging multiple View, we will have to craft our own Animated setValue for the top Item and the other animations that is happening behind it.
- **What happens when you release the item:** When we let go of the item we interacted with what happens. This is what we will consider  for onPanResponderRelease. Eg does a spring animation happens that springs the object to the side of the screen?
- Considering these three things will help you break down each animation that need to happen at what step

# Using Flubber and Animated for Better SVG Path Morphing
- With the help of SetNativeProps we could set the interoplate between two SGV paths in a `react-native-svg` Path component
- I used `yarn add flubber` to install the flubber dependency
- [How to Use SVG in React native](https://blog.usejournal.com/how-to-use-svg-in-react-native-e581eca59534)
- [https://medium.com/@nitishprasad/svg-path-animation-in-react-native-ecbd7a503ba3](https://medium.com/@nitishprasad/svg-path-animation-in-react-native-ecbd7a503ba3)
- [https://stackoverflow.com/questions/66788391/react-native-svg-not-rendered-correct](https://stackoverflow.com/questions/66788391/react-native-svg-not-rendered-correct)


# Animated Techniques that are good to know
- .99 clif: The .99 cliff is a great way to make animations happen instantly. See [here](https://codedaily.io/courses/Master-React-Native-Animations/99-cliff)
- Unmounting Animared Components. We implemented in code
- Interupping a Animation.Values or Many Animation Values: read [here](https://codedaily.io/courses/Master-React-Native-Animations/Interrupted-Animations)
- Pointer Events: Read here(https://codedaily.io/courses/Master-React-Native-Animations/Pointer-Events)
Animated Hidden and Inerrupted Animations

# Breaking down 4 Cards animation
When the box is at rest it stays at the top-left corner.
- For the box to spring down to the bottom-left corner from rest position, there will be a translateY(positive value) that will happen
- For the box to go from the bottom-left to the bottom-right, there will be a translateX(positive value) that will happen
- For the box to go from the bottom-right corner to the top-right corner, there will be a translateY(negative value)
- For the box to go from the top-right corner back to starting position there will be a translateX(negative value)
- So we see there is a translateXY to all four corners with a fixed sized box.
- **Main TakeAway:** It does not matter whatever you are animating, you can always grab a dynamic values of the element, like width and height, XY(to get the position of the element in screen) to control how it moves or how you want to move it across the screen. You can always use onLayout to grab these values, even if it is a flex, there will always be values that you can grab and determine how you want to control your animation dynamically 

# Breaking down Stagger Form Items Visibility on Mount
Common Animation that occurs are onMount animations. These are animation that happens to focus your attention on particular item(s) of importance.
- When the login screen mounts, each of the form fields staggers in its opacity.
- Also there is an offset on the position of the form files which gives them the illusion of being moved downwards a bit as the opacity for each item goes to 1
- We could use an interpolation for each of the form items, but we choose to set it up as each individual animated value so that we can use stagger. 
- There will be an interpolation of zero to one that offsets each item position to about 5 and then transitions in. We will set position of items using layouts and we will setValues that will offset the position to begin and then will animate it back in to the normal position. This is best because we don't have to use delay to control the positioning of the items. We let the layout take effect and we use the translates to offset it correctly.
- **Takeaway:** Even though the duration of the animations have thesame, Because of the stagger they will all link up together perspectively. This is good useful for implementing Coordinated Motions, Chaotic Motions on ListItems. You can use this library [react-native-animatable](https://github.com/oblador/react-native-animatable) but i think you can do it without the library :)

# Animated Progress Bar Button Breakdown
- There is an animation that takes place in the background of a buttonView. The animtion is btwetween the buttonText and the background of the view.
- There is a single animated value that will animate from 0 to 1. 
- We have a animatedView in the background have an absolute position of top, bottom, and left of 0 and we interpolate the width until it fill out the parent. So we go by percentage interpolation of the width
- At the very end of the aniation of the view, it fades out. We will add a secondary animation for this
- So we end up having two animated values, one for the backgroud-color and the widht, and the second for the opacity(resposible for the fade out the progressBar)

# Animated Questionnaire with Progress Bar
- When we press on any of the sides, we animate one question out and another question in. Additionally, a progress bar happens at the bottom of the page. 
- There is a translateY happening and responsible for the question sliding in and out. As one translateY goes out from the left, another translateY slides in from the right.
- As Swap happens when next question translates in. The next question to answer is always off the screen positioned at the right. So as the current question being answered translates off the screen, we translate in the next question in and then a swap happens at the center of the screen. Then we get the next question ready at the right side of the page off the screen.
- The progressBar is just interpolating its width length off of the number of question asked. The progressBar will have its own animatedValue with interpolation.
- When we press X icon at the top right of the screen, all the animations just reset instantly
- We got this animation idea from [here](https://dribbble.com/shots/3277162-Questionaire) and an easy way to check out the breakdown of that animation is to save the image(animation images are in gif formats) on your local machine, open the image up in Preview, the you will see all the gif, frame by frame. You can step through the frames and see the transitions that are happening. You dont have to look at all the frames but for each frame you can see what exactly is happening and what sort of effects you need to re-create.

# Photo Grid Shared Element
The shared element idea is a multi stage process, but it follows a general guideline.
- Get the position of the item (width/height/x/y)
- Set animated values with those values
- Render shared item using animated values so it appears in the same spot as our start item
- Get the destination dimensions (width/height/x/y) (wrapping container positions)
Animate the animated values to final destination
There is another method without a wrapping container: 
- Get the position/size of the item (width/height/x/y)
- Render destination item hidden with opacity
- Get the position/size of the destination item (width/height/x/y)
- Set animated values with the values of the start item
- Animate the animated values to final destination
This works well for images, however there are cases where you want to do text, etc. This gets even more complicated but is still possible. The simple naive solution that a lot of people use is to snapshot a view (turn it into an image), and then morph it to it's destination and then swap in the actual content.

# Animated Color Picker 
- Takeaway is have all the layout set out for the view first, then start to reverse each piece of effect at a time until you have the animation that you desired for and use pointer events when you need to
- The animation you learned here is useful where sometimes you might want to swap out icons in the Header of your screen triggered by certain actions on the page or while swiping between page screens. The technique you learned here will be useful
- This animation is inspired by [Nick Frost](https://dribbble.com/shots/2229372)
- Breakdown of the animation [here](https://codedaily.io/courses/Master-React-Native-Animations/Animated-Color-Picker-Breakdown)

# Floating Action Button with Menu
- **Takeaway** is to being detect a reversible animation and know that that you want to have the range as simple as from 0 to 1. if the reversible animation is controlled by a scrollView where the range can be highr, just know the range you want to accept and interpolate it from 0 to 1 and use the output interpolation as input to drive yoir animations
- AnimationBreakDown [here](https://codedaily.io/courses/Master-React-Native-Animations/Floating-Action-Button-with-Menu-Breakdown)

# Application Intro Screen
- The Aim of this animations is to understand how to animate objects in ScrollViews while they are scrolling
- In a real world example you would be deriving your inputRange based upon the index of the screen (like in ViewPager) and not explicitly building it out like we did in the Demo. However building it manually was done to show case exactly what is happening behind the scenes. We're emphasizing dynamic interpolation input ranges while still emphasizing that you can produce normal output range effects.
- See the animation breakdown [here](https://codedaily.io/courses/Master-React-Native-Animations/Application-Intro-Screen-Breakdown)

# Evolving Write Button
- This animation was inspired by Mike Dick on [dribbble](https://dribbble.com/shots/3046893)
- Animation BreakDown [here](https://codedaily.io/courses/Master-React-Native-Animations/Evolving-Write-Button-Breakdown)

# Modal Swipe Away
- [https://codedaily.io/courses/Master-React-Native-Animations/Create-a-Social-Comment-Modal-with-Animated-Swipe-Away-in-React-Native](https://codedaily.io/courses/Master-React-Native-Animations/Create-a-Social-Comment-Modal-with-Animated-Swipe-Away-in-React-Native)

# Evolve Write button
[Source code with React-Native](https://github.com/browniefed/examples/blob/realworld/notifybutton/realworld/app.android.js)

# Exploding Heart with bounce button
- I used reanimated to inplement this. If you want to check out the code where just normal RN Animated was used look at [here](https://github.com/browniefed/examples/blob/realworld/explodinghearts/realworld/app.android.js).
- This youtube [video](https://codedaily.io/tutorials/Creating-Animated-Rings-with-React-Native-Reanimated) about exploding rings in reanimated helped me learn how i can go about implementing this in reanimated. It was a but tricky, because with re-animated, there is no way of running animations for different views in parallel. So to get this done, you will have to use React States which i did. Also there is no stagger animations with ReAnimatedV2 but you you work around this as well. EOD, Reanimated, encourages using re-usable components for your animated views as much as you can.
- If you want to understand how the heart was built watch this [video](https://codedaily.io/courses/Master-React-Native-Animations/Bounce-a-Heart-Shaped-Button-in-React-Native-on-Press)

# Horizontal Parallax ScrollView
- In this lesson we'll create a Twitter Moments clone with a horizontal parallax image scrolling effect. We'll use useAnimatedScrollHandler and interpolation from reanimated to make the effect work.

# Steps to follow to breakDown an animation Design
Being able to breakDown step by step each particular animation, it is very helpful to have it frame by frame or to be able to have the designer(like on dribble) explain it to you and categorize the type of animations because all animations are going to be a series of either a layout change with width and height or it is going to be a opacity or transform. In transform you have translates which are movements. 
- If you see something moving position is is likely a translate. 
- if you see something growing it is likely a width and height modification or a scale X and Y modification.
- If you see something and then it disappears then it is an opacity
- If an object is rotating, then it is a rotate. You use interpolators to get this done
- **What are the Animated properties that is changing?** Are objects appearing and disappearing(we may need to manipulate the opacity and unmount the animations), Are objects moving around(translations). Are objects rotating?, Are Objects Scaling? As yourself these questions. Properties you will or can animate are Opacity, Scale, Translate Position, Width and Height (use translateX and translateY for more performant animation of height and width), BackgroundColor, width/height percentages. See all of these [here](https://codedaily.io/courses/Master-React-Native-Animations/Animating-Properties). Knowing the Animating properties will help you decide if you need a single animated value then use interpolation to control all the animations or you need to define multiple values and control them in parallel or in sequence. At this point you should know how many animations going on and which [animated values](https://codedaily.io/courses/Master-React-Native-Animations/AnimatedValue-Functions) you need.
- **What triggers the animation or when does the animation start?** is it a drag(PanGesture), scroll, buttonPress(Tap Gesture or just normalTouchable where then call timing, spring, etc), useLayoutEffect(means the animation will be triggered right after the screen or component mounts). This will help us decide how we want to store and update the animatedValues. At this point, you should know which Animated functions you need like Animated.Event, Animated.extractOffset, Animated.Add, Animated.Stagger etc etc. see more [here](https://codedaily.io/courses/Master-React-Native-Animations/Animated-Functions)
- If it is a drag that triggers the animation, then you can ask, **what animation decision happens on first touch? what happens while we drag?** and **what happens when we release the touch?** After we are done dragging does the element sat where it is or its been thrown away? Remember animating properties like opacity, scale, etc will be changing as well during the drag event. Its nothing new
- **Will the animated views need to unMount or remain in screen when they are done animating?** Do we need to Make the Animated view to be non-interactable when it is done animating but still visible in screen? Are animations interrupted? See more [here](https://codedaily.io/courses/Master-React-Native-Animations/Animated-Techniques)
- **Do our animation depends on dynamic measurements of the items?** If so, then we will need to onLayout method to get measurements of Views like screen size, View size, etc

# Steps to follow when implementing the animations
- Most of the time, it makes sense to start with the view you are attempting to animate to. This means start with what the view will look like at the end of the animation and slowly work it down to the beginning view of the animation. If you build your views first, then creating the animations to go from different states is a lot easier. 
- Second ask yourself are the animations reversible? Using a single animated value we'll be able to craft a reversible animation. This means that we will have a single animatedValue that we animate from 0 to 1 and everything interpolates correctly around that range. Eg opacity(show/hidden; you can use scale to show or hide views as well), translate(move left/right)
- At this point you should have the state and beginning state of the animations in your UI. You should add animatedStyle to slowly transition each piece until you have the each until you have the exact animation that you want (from beginning to end and end to beginning). You may need interpolators to complete this step! Eg, start from hidden(like scale 0 or opacity 0) and reveal(scale 1 or higher and opacity 1) them. Remember objects don't just appear or disappear. They are already there in the UI you are just revealing them. Don't forget that you can always toggle your default value to see if your animation style will work as expected when the animation starts while you are coding. Eg you can change the Animated.Value(0) to Animated.Value(1) after you have applied the animationStyles the the view, save the file, reload and see what it looks like
- Execute your transition. The transition could be triggered by scrollEvent, GestureEvent(like drag, doubleTap, ZoomIn etc), inside useLayoutEffect, OnPress, etc. Basically this event will trigger the animation.

# Terms on Animations
- **Color/Background Color:** In order to animate colors, you must use interpolators. When interpolating colors it must be in rbg/rgba/hcl. Changing colors, and opacity of colors (using rgba) is another common animation in an application
- **Width/Height Percentage:** You can interpolate width and height percentages as well
- **Easing:** When dealing with animations and physics, there could be a time when you want physics to be applied but over a set period of time. You can set the exact physics you want to happen based on your specific usecase. Easing can be applied to your timed(Animated.timming) animation
- **Interpolation:** The Animated Library comes from interpolation. You are able to do interpolation on interpolations and it will still be reactive regarding of a timming or anything else that is triggering the animation. The output range of an interpolate can become the input range of another interpolate. When the animations are connected with interpolate it requires you to control a singular value and drive a range of animations. Meaning less work for us, and better animations.

# UnderStanding React Native Reanimated
- For setUp, the boiler plate generated by npx create-react-native-app already have the latest reanimated configured for you out of the box. So you have to set it up yourself. You might just see yourself using helper libraries like `react-native-redash` depending on certain complex calculations you need for your animations.
- This [Playlist](https://www.youtube.com/playlist?list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ) explained the basics or reanimated 2. Personally, i will try to use [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/docs/animations/) for all my animations as much as i can instead of a Animated from vanilla `react-native`
- [Introduction to Reanimated in React Native](https://codedaily.io/courses/React-Native-Reanimated-Fundamentals/Introduction-to-Reanimated-in-React-Native)
- [Understanding reanimatedV2 wit Rocketseat](https://www.youtube.com/watch?v=6uixYHh7XEc)
- [Animations in React Native: Performance and Reason-about-ability with Reanimated 2](https://formidable.com/blog/2021/reanimated-two/)
- [https://github.com/enzomanuelmangano/animate-with-reanimated](https://github.com/enzomanuelmangano/animate-with-reanimated)
- [https://github.com/software-mansion/react-native-reanimated/issues/1014](https://github.com/software-mansion/react-native-reanimated/issues/1014)
- [https://docs.swmansion.com/react-native-gesture-handler/docs/about-handlers](https://docs.swmansion.com/react-native-gesture-handler/docs/about-handlers)
- [https://docs.swmansion.com/react-native-reanimated/docs/](https://docs.swmansion.com/react-native-reanimated/docs/)
- [https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ](https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ)
- [https://thewidlarzgroup.com/reanimated2-slider/](https://thewidlarzgroup.com/reanimated2-slider/)
- [AnimatedFlatList's scroll and drag performance - Reanimated2](https://bleepcoder.com/react-native-reanimated/759609102/animatedflatlist-s-scroll-and-drag-performance-reanimated2)
- [https://blog.swmansion.com/reanimated-2-events-5bf09d1c8678](https://blog.swmansion.com/reanimated-2-events-5bf09d1c8678)
- [https://rishabhrathod.hashnode.dev/implementing-miuis-wave-animation-using-react-native-reanimated-v2](https://rishabhrathod.hashnode.dev/implementing-miuis-wave-animation-using-react-native-reanimated-v2)

# More to Explore
- Collapsible Header: This technique is used to show additional information or actions but hide when the user scrolls to expose more of the information they are looking at. We'll use a combination of ScrollView, onScroll, and the Animated.event function to update our Animated.Value every time the user scrolls. Then with a series of interpolate calls we can define a scroll threshold to show/hide pieces of information, as well as shrink the fontSize of our title. Watch [this](https://codedaily.io/tutorials/Create-a-Collapsible-Header-Bar-in-React-Native) and see the [source code](https://github.com/browniefed/examples/blob/realworld/collapsenav/realworld/index.android.js) here. You can start watching this [other video](https://www.youtube.com/watch?v=6uixYHh7XEc) from 44:31 timeStap to see hoe its done with reanimatedV2
- Toggle Hidden Details on a React Native Event Card: we'll create an event details card with basic information displayed. On press basic information will slide up to present additional information. [https://www.youtube.com/watch?v=743bSV-AtHc](https://www.youtube.com/watch?v=743bSV-AtHc)
- `@react-navigation/native react-native-safe-area-context @react-navigation/stack react-native-shared-element react-navigation-shared-element@next`