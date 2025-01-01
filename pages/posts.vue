<template>
    <div class="container">

        <p>This page shows all the recent posts on Reddit that match your alert settings.
            Table is limited to first 100 results for now.
        </p>

        <v-container>
            <v-row align="center" justify="start" class="mt-4">

                <v-col cols="auto">

                    <v-radio-group
                            v-model="postFilters.sort"
                            inline
                    >

                        <v-radio
                                label="Newest"
                                value="time"
                        ></v-radio>
                        <v-radio
                                label="Most Popular"
                                value="score"
                        ></v-radio>
                        <v-radio
                                label="Most Commented"
                                value="num_comments"
                        ></v-radio>
                    </v-radio-group>

                </v-col>

                <v-col cols="auto">

                    <v-select
                            density="compact"
                            label="Time Range"
                            outlined
                            dense
                            v-model="postFilters.time_range"
                            :items="timeRangeOptions"
                            variant="outlined"
                    ></v-select>
                </v-col>

                <v-col cols="auto">
                    <v-select
                            density="compact"
                            label="Filter by Alert"
                            :items="alertOptions"
                            v-model="postFilters.alert_id"
                            variant="outlined"
                    ></v-select>
                </v-col>

                <v-col cols="auto">
                    <refresh-button @click="loadPosts" :loading="isLoading"></refresh-button>
                </v-col>

            </v-row>
        </v-container>

        <v-table height="400px" :fixed-header="true">
            <thead>
            <tr>
                <th class="text-left">Post Title</th>
            </tr>
            </thead>
            <tbody>

            <table-row-loading v-if="isLoading"></table-row-loading>

            <tr v-else-if="items.length === 0">
                <td colspan="100%">
                    <div class="text-center py-8">No posts found yet!</div>
                </td>
            </tr>

            <tr v-else v-for="item in items" :key="item.id">
                <td>

                    <a :href="item.short_link" target="_blank" rel="nofollow">{{ item.title }}</a>
                    <br>
                    {{ item.score }} points – {{ item.num_comments }} comments –
                    <span class="text-muted">{{ item.postedAgo }}</span> –
                    <span class="text-red">/r/{{ item.subreddit.name }}</span>
                    (~{{ item.subreddit.subscriber_count_formatted }} subs)

                </td>
            </tr>
            </tbody>
        </v-table>

    </div>
</template>

<script setup lang="ts">
import api from "~/api";
import TableRowLoading from "~/components/partials/TableRowLoading.vue";
import type {RedditPost, WithBusy} from "~/types";
import {formatDistanceToNow} from "date-fns";

useHead({
    title: 'Posts - RedditWatch'
});

interface TableItem extends WithBusy, RedditPost {
    postedAgo: string
}

const postFilters = ref({
    sort: 'time',
    time_range: '1d',
    alert_id: null
})

let isLoading = ref(false);

const timeRangeOptions = [
    {value: '1h', title: 'Past hour'},
    {value: '3h', title: '3 hours'},
    {value: '6h', title: '6 hours'},
    {value: '1d', title: '24 hours'},
    {value: '48h', title: '48 hours'}
];

const alertOptions = ref([
    {value: null, title: 'All alerts'}
]);

const items = ref<TableItem[]>([]);

async function loadPosts() {

    isLoading.value = true;

    const filters = Object.assign({}, postFilters.value);

    const response = await api.posts(filters);
    const {data} = response;

    items.value = [];

    for (const item of data) {

        const date = new Date(item.created_utc * 1000);
        const postedAgo = formatDistanceToNow(date, {addSuffix: true});

        const detailed = {...item, ...{postedAgo: postedAgo}};

        items.value.push(detailed);
    }

    isLoading.value = false;
}

async function loadAlerts() {

    const response = await api.alerts();
    const {data} = response;

    if (data) {

        for (const alert of data) {
            alertOptions.value.push({
                value: alert.id,
                title: alert.query
            })
        }
    }

}

watch(postFilters, () => {
    loadPosts();
}, {deep: true});


onMounted(() => {
    loadPosts();
    loadAlerts();
});

</script>

<style scoped>
.selected-item {
    background-color: #e3f2fd; /* Light blue background */
    color: #0d47a1; /* Dark blue text */
}
</style>
