import React from "react"
import { View, FlatList, Image, TouchableOpacity, Text, Dimensions, StyleSheet }  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"


const articles = [
    {
        id: 1,
        title: "Ebooks, Neither E, Nor Books",
        author: "Cory Doctorow",
        body: "For starters, let me try to summarize the lessons and intuitions\r\nI've had about ebooks from my release of two novels and most of a\r\nshort story collection online under a Creative Commons license. A\r\nparodist who published a list of alternate titles for the\r\npresentations at this event called this talk, \"eBooks Suck Right\r\nNow,\" [eBooks suck right now] and as funny as that is, I don't\r\nthink it's true.\r\n\r\nNo, if I had to come up with another title for this talk, I'd\r\ncall it: \"Ebooks: You're Soaking in Them.\" [Ebooks: You're\r\nSoaking in Them] That's because I think that the shape of ebooks\r\nto come is almost visible in the way that people interact with\r\ntext today, and that the job of authors who want to become rich\r\nand famous is to come to a better understanding of that shape.\r\n\r\nI haven't come to a perfect understanding. I don't know what the\r\nfuture of the book looks like. But I have ideas, and I'll share\r\nthem with you:\r\n\r\n1. Ebooks aren't marketing. [Ebooks aren't marketing] OK, so\r\nebooks *are* marketing: that is to say that giving away ebooks\r\nsells more books.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be60_ebooks/ebooks.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be60_ebooks/ebooks.jpg",
        aspect_ratio: "1:5",
        published_date: "Feb 12, 2004"
    },
    {
        id: 2,
        title: "Japanese Fairy Tales",
        author: "Yei Theodora Ozaki",
        body: "TO\r\n\r\nELEANOR MARION-CRAWFORD.\r\n\r\nI DEDICATE THIS BOOK TO YOU AND TO THE SWEET CHILD-FRIENDSHIP THAT YOU\r\nGAVE ME IN THE DAYS SPENT WITH YOU BY THE SOUTHERN SEA, WHEN YOU USED\r\nTO LISTEN WITH UNFEIGNED PLEASURE TO THESE FAIRY STORIES FROM FAR\r\nJAPAN. MAY THEY NOW REMIND YOU OF MY CHANGELESS LOVE AND REMEMBRANCE.\r\n\r\nY. T. O.\r\n\r\nTokio, 1908.\r\n\r\n\r\n\r\n\r\nPREFACE.\r\n\r\nThis collection of Japanese fairy tales is the outcome of a suggestion\r\nmade to me indirectly through a friend by Mr. Andrew Lang. They have\r\nbeen translated from the modern version written by Sadanami Sanjin.\r\nThese stories are not literal translations, and though the Japanese\r\nstory and all quaint Japanese expressions have been faithfully\r\npreserved, they have been told more with the view to interest young\r\nreaders of the West than the technical student of folk-lore.\r\n\r\nGrateful acknowledgment is due to Mr. Y. Yasuoka, Miss Fusa Okamoto, my\r\nbrother Nobumori Ozaki, Dr. Yoshihiro Takaki, and Miss Kameko Yamao,\r\nwho have helped me with translations.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_japanesefairytales/japanesefairytales.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_japanesefairytales/japanesefairytales.jpg",
        aspect_ratio: "1:5",
        published_date: "Jan 1, 1908",
    },
    {
        id: 3,
        title: "The Scarlet Plague",
        author: "Jack London",
        body: "I\n\nTHE way led along upon what had once been the embankment of a railroad.\r\nBut no train had run upon it for many years. The forest on either side\r\nswelled up the slopes of the embankment and crested across it in a green\r\nwave of trees and bushes. The trail was as narrow as a man’s body, and\r\nwas no more than a wild-animal runway. Occasionally, a piece of rusty\r\niron, showing through the forest-mould, advertised that the rail and the\r\nties still remained. In one place, a ten-inch tree, bursting through at\r\na connection, had lifted the end of a rail clearly into view. The tie\r\nhad evidently followed the rail, held to it by the spike long enough\r\nfor its bed to be filled with gravel and rotten leaves, so that now the\r\ncrumbling, rotten timber thrust itself up at a curious slant. Old as the\r\nroad was, it was manifest that it had been of the mono-rail type.\r\n\r\nAn old man and a boy travelled along this runway. They moved slowly, for\r\nthe old man was very old, a touch of palsy made his movements tremulous,\r\nand he leaned heavily upon his staff. A rude skull-cap of goat-skin\r\nprotected his head from the sun. From beneath this fell a scant fringe\r\nof stained and dirty-white hair.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_scarlet-plague/scarlet-plague.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be62_scarlet-plague/scarlet-plague.jpg",
        aspect_ratio: "1:5",
        published_date: "Jan 1, 1912",
    },
    {
        id: 4,
        title: "The Son Of The Wolf",
        author: "Jack London",
        body: "The White Silence\r\n\r\n'Carmen won't last more than a couple of days.' Mason spat out a chunk\r\nof ice and surveyed the poor animal ruefully, then put her foot in his\r\nmouth and proceeded to bite out the ice which clustered cruelly between\r\nthe toes.\r\n\r\n'I never saw a dog with a highfalutin' name that ever was worth a rap,'\r\nhe said, as he concluded his task and shoved her aside. 'They just fade\r\naway and die under the responsibility. Did ye ever see one go wrong\r\nwith a sensible name like Cassiar, Siwash, or Husky? No, sir! Take a\r\nlook at Shookum here, he's--' Snap! The lean brute flashed up, the\r\nwhite teeth just missing Mason's throat.\r\n\r\n'Ye will, will ye?' A shrewd clout behind the ear with the butt of the\r\ndog whip stretched the animal in the snow, quivering softly, a yellow\r\nslaver dripping from its fangs.\r\n\r\n'As I was saying, just look at Shookum here--he's got the spirit. Bet\r\nye he eats Carmen before the week's out.' 'I'll bank another\r\nproposition against that,' replied Malemute Kid, reversing the frozen\r\nbread placed before the fire to thaw. 'We'll eat Shookum before the\r\ntrip is over.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be65_sonofthewolf/sonofthewolf.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be65_sonofthewolf/sonofthewolf.jpg",
        aspect_ratio: "1:5",
        published_date: "Jan 1, 1820",
    },
    {
        id: 5,
        title: "Second Variety",
        author: "Philip K. Dick",
        body: "    The claws were bad enough in the first place--nasty, crawling\r\n    little death-robots. But when they began to imitate their\r\n    creators, it was time for the human race to make peace--if it\r\n    could!\r\n\r\n\r\nThe Russian soldier made his way nervously up the ragged side of the\r\nhill, holding his gun ready. He glanced around him, licking his dry\r\nlips, his face set. From time to time he reached up a gloved hand and\r\nwiped perspiration from his neck, pushing down his coat collar.\r\n\r\nEric turned to Corporal Leone. \"Want him? Or can I have him?\" He\r\nadjusted the view sight so the Russian's features squarely filled the\r\nglass, the lines cutting across his hard, somber features.\r\n\r\nLeone considered. The Russian was close, moving rapidly, almost\r\nrunning. \"Don't fire. Wait.\" Leone tensed. \"I don't think we're\r\nneeded.\"\r\n\r\nThe Russian increased his pace, kicking ash and piles of debris out of\r\nhis way. He reached the top of the hill and stopped, panting, staring\r\naround him. The sky was overcast, drifting clouds of gray particles.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be63_secondvariety/secondvariety.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be63_secondvariety/secondvariety.jpg",
        aspect_ratio: "1:5",
        published_date: "May 1, 1953",

    },
    {
        id: 6,
        title: "The Legend of Sleepy Hollow",
        author: "Washington Irving",
        body: "FOUND AMONG THE PAPERS OF THE LATE DIEDRICH KNICKERBOCKER.\r\n\r\n\r\n        A pleasing land of drowsy head it was,\r\n          Of dreams that wave before the half-shut eye;\r\n        And of gay castles in the clouds that pass,\r\n          Forever flushing round a summer sky.\r\n                                         CASTLE OF INDOLENCE.\r\n\r\n\r\nIn the bosom of one of those spacious coves which indent the eastern\r\nshore of the Hudson, at that broad expansion of the river denominated\r\nby the ancient Dutch navigators the Tappan Zee, and where they always\r\nprudently shortened sail and implored the protection of St. Nicholas\r\nwhen they crossed, there lies a small market town or rural port, which\r\nby some is called Greensburgh, but which is more generally and properly\r\nknown by the name of Tarry Town. This name was given, we are told, in\r\nformer days, by the good housewives of the adjacent country, from the\r\ninveterate propensity of their husbands to linger about the village\r\ntavern on market days.",
        thumb: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be64_sleepyhollow/sleepyhollow.jpg",
        photo: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58c5be64_sleepyhollow/sleepyhollow.jpg",
        aspect_ratio: "1:5",
        published_date: "Jan 1, 1900",
    }
]

const margin = 10
const width = Dimensions.get("window").width / 2 - margin * 2


export default function XYZReaderComponent({ route, navigation }){

    return (
        <SafeAreaView style={{ flex: 1}} edges={["bottom", "left", "right"]}>
            <FlatList
                data={articles}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ justifyContent: "center", alignItems:"center", paddingTop: 16}}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate(Strings.component_xyz_reader_details, { item })}>
                            <View style={styles.item}>
                                <Image
                                    source={{uri: item.thumb}}
                                    style={styles.image}
                                />
                                <View style={{ paddingHorizontal: 10, paddingVertical: 16 }}>
                                    <Text numberOfLines={4} style={{ fontSize: 18 }}>{item.title}</Text>
                                    <Text numberOfLines={2} style={{ width:"100%", color:"#757575", fontSize: 16 }}>{item.published_date+"\nby"+item.author}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}                    
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1, 
        flexDirection:"column", 
        marginBottom: 16,
        marginHorizontal: 7,
        backgroundColor: Colors.back,
        width,
        minHeight: width * 1.4,
    },
    image: {
        resizeMode: "cover",
        aspectRatio: 3/2,
    },
})

export function XYZReaderComponentOptions(){
    return {
        title: "XYZReader",
        headerTintColor: Colors.back,
        headerStyle: { 
            backgroundColor: Colors.theme_primary,
        },
    }
}