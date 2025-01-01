<template>
    <div class="container-md">

        <p>
            <strong>Reddit Watch</strong> is a free tool for monitoring Reddit for posts containing certain keyword(s)
            in near
            real-time.
        </p>

        <p>
            I built a limited version of this application for my own personal use some time ago, but I have now opened
            it up for anyone to use within reasonable limits.
        </p>

        <h2 class="mb-3">Why?</h2>

        <p>
            One use of this is to filter down <strong>Reddit</strong> discussions to a few specific topics that you are
            interested in.
        </p>

        <p>
            Another potentially effective use of this is for influencing Reddit discussions in a certain way.
            <br>
            By upvoting or commenting on certain threads as soon as they are posted,
            you have a much better chance for those threads to do well - especially if you have enough people
            participating in this.

            In Reddit's algorithm, earlier votes are worth more, and that is because early and positive "upvote
            momentum" is rewarded more. Same with downvotes.
            That is why downvoting a post that's already at the top of a particular subreddit will
            have little effect, where as downvoting a post that just got posted will mean a lot more.
        </p>

        <p>
            It works the same with comments where commenting on a thread that already has hundreds of comments makes it
            very unlikely that your comment will
            gather enough momentum to move to the top or be seen by a great number of people.
        </p>

        <div class="text-center my-8">
            <v-btn
                    color="accent"
                    size="large"
                    outlined
                    class="px-4"
                    @click.prevent="loginDemo">
                <v-icon left>mdi-chevron-right</v-icon>
                See a demo
            </v-btn>
        </div>

        <hr class="my-4">

        <h2 class="mt-5">To-do list...</h2>

        <ul>
            <li>Better design...</li>
            <li>Improved support across devices - it's not too bad at the moment, but the app still looks much better on
                desktop than mobile.
            </li>
            <li>More notification "channels" - get notified through email or slack</li>
            <li>Would be useful to have an ability to track specific reddit users, and get notified whenever they post
                or make
                a comment anywhere on reddit.
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store";

useHead({
    title: 'Reddit Watch - Monitor Reddit posts by keyword in real time!'
});

const {loginDemo} = useAuthStore();

</script>
