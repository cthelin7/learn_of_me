<template>
    <v-card-text>Many people talk about being "Christ-like." What does that mean? What is Jesus Christ really like? Who is Jesus Christ?</v-card-text>
  
  <v-card-text> People usually respond to this question with a summary of His life, or a recitation of doctrine. What we sometimes forget is that He is a real, living person - Jesus Christ was crucified for our sins and then rose from the dead. He lives today as a resurrected Being. He has real thoughts, real feelings, and a real personality, right now. We can know Him and have a personal relationship with Him through conversations with Him, following Him, and opening our hearts to His Spirit. </v-card-text>
  
  <v-img :src="JesusWithChildImage"></v-img>
 
  <v-card-text>In 2017, <a href="https://youtu.be/bACX8BXHuEs" target="_blank">Russell M. Nelson</a> (President of the Church of Jesus Christ of Latter-day Saints) extended the following invitation:</v-card-text>
  
  <blockquote class="blockquote">"Commence [now] to consecrate a portion of your time each week to studying <b>everything</b> Jesus said and did as recorded in the [scriptures]. Study His laws... His doctrine... [and] His words[.] This may seem like a large assignment. But I encourage you to accept it. If you proceed to learn all you can about Jesus Christ, I promise you that your love for Him, and for God’s laws, will grow beyond what you currently imagine. I promise you also that your ability to turn away from sin will increase. Your desire to keep the commandments will soar. You will find yourself better able to walk away from the entertainment and entanglements of those who mock the followers of Jesus Christ. (“Prophets, Leadership, and Divine Law,” Worldwide Devotional for Young Adults, January 8, 2017)</blockquote>
  <v-img :src="PresidentNelsonImage"></v-img>

	<v-card-text>I took that challenge, and have been recording the insights I have found in the scriptures (the <a href="https://www.churchofjesuschrist.org/study/scriptures/nt?lang=eng" target="_blank">Holy Bible</a>, the <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng" target="_blank">Book of Mormon</a>, and the <a href="https://www.churchofjesuschrist.org/study/scriptures/dc-testament?lang=eng" target="_blank">Doctrine and Covenants</a> of the Church of Jesus Christ of Latter-day Saints). I wrote down every new thing I learned about Christ - attributes and qualities of His personality, how He sees things, what He finds important, who He is, etc.</v-card-text>
	
    <v-img :src="ScriptureImage"></v-img>

	<v-card-text>It has changed my relationship with Jesus Christ. I have been astounded at how much of His character is contained in His words. This page contains these insights, and my hope is that they can help others come to know Him better, too.</v-card-text>
	
	<v-card-text>Even still, these are just words. The real miracle has been coming to know Jesus Christ better through His Spirit and by following His path. The prophetic promise President Nelson made has been true for me: I have come closer to Jesus Christ, feel greater love for Him, and felt His light grow in my life. I have felt His sweet embrace in my darker moments. I have been guided by Him in making critical decisions in my life. Even as I have pushed Him away, I've realized He persistently, unfailingly loves me and refuses to give up on me. I know He lives, I know He speak to us today through His prophet and His Spirit, and I know the holy scriptures are filled with His words. I have had intimate, personal, direct experiences with the Son of God, the Savior Jesus Christ.</v-card-text>
	
	<v-card-text>I "commend you to seek this Jesus of whom the prophets and apostles have written" (<a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12.41?lang=eng#p41#41" target="_blank">Ether 12:41</a>) and encourage you to follow Him and come to know Him for yourself.</v-card-text>
	<v-img :src="JesusSmilingImage"></v-img>
</template>

<script>
import ScriptureImage from "@/assets/images/scriptures.jpg";
import PresidentNelsonImage from "@/assets/images/president_nelson.jpg";
import JesusWithChildImage from "@/assets/images/carousel/pictures_of_jesus_with_a_child.jpeg";
import JesusSmilingImage from "@/assets/images/carousel/pictures_of_jesus_smiling.jpeg";

export default {
    data: () => ({
        PresidentNelsonImage: PresidentNelsonImage,
        ScriptureImage: ScriptureImage,
        JesusWithChildImage: JesusWithChildImage,
        JesusSmilingImage: JesusSmilingImage
    }),
}
</script>
  