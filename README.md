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

