# Understanding SharedElement Transition in React Native

- When chanigng the state of your UI, motion can helps you explain that change as well as focus your attention on the content that matters and Shared Element helps you achieve this
- SharedElements can help help you move states within a Screen and not just across screen boundries. Eg: You can have a screen as as modal with a transparent background and have it share transition from the modal screen parent page to the modal itself. This will have a illusion where the detail screen surface lifts off from the surface below to form its own screen.
- SharedElements helps provides continuity within different states of in your UI to create a more understandable experience. 

# Few Rules to Follow to get the best Shared Transition experience for your app
- Views that you want to share between two screens must have a unique id attribute that identifies them in Views. You can have the name of this id come from a string resource file or from the API data. eg Screen1 has a SharedElement of id `Strings.transition_item` and Screen2 should also have a SharedElement of id `Strings.transition_item` 
- If the Elements shared is a Text, it is important that the color as well number of lines the text is occupying be thesame. The fontSize of the text maybe not necessarity have to be exactly thesame but the difference in fontSize show not be too far away from each other. Eg looking as Demo2, The article title and subtitle has a bit of wonky transition because the text color and number of lines are different between pages. So don do that in a real app
- You can Views like Button, Text, Image and View. In addtion these views may need to have the `position: absolute` in their style respoectively for better transition
- The DetailScreen that the Mater Screen will share elements with can be a Modal Screen(with transparent, covered or opaque background. This helps potray the illusion of the detail screen lifting up from the listLitem to form its own surface from the Master screen) or it can be a regular screen as well(with noraml navigation transition animations)


