<template>
    <div class="container">

        <h2>Alerts</h2>

        <p>
            Create an alert around some keywords to get matching posts immediately as they are posted to reddit.
            <br>

            You are limited to <strong>3 alerts</strong>, and all alerts combined

            will match no more than 100 posts per hour (after that it will stop), so keep your alerts as specific as
            possible.
        </p>

        <div class="mt-8 mb-5 d-flex justify-center align-center mx-auto">

            <v-btn small color="primary" class="mr-3" @click="newAlertClicked" :disabled="isDemoUser">
                <v-icon>mdi-plus</v-icon>
                <span>New Alert</span>
            </v-btn>

            <refresh-button @click="loadItems"></refresh-button>
        </div>

        <alert-form-dialog v-model="isAlertDialogOpen" :alert="selectedAlert"></alert-form-dialog>

        <v-table density="compact">
            <thead>
            <tr>
                <th class="text-left">Added</th>
                <th class="text-left">Search Query</th>
                <th># of Posts (hour)</th>
                <th># of Posts (day)</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            <table-row-loading v-if="refState.isLoading"></table-row-loading>

            <tr v-else-if="items.length === 0">
                <td colspan="100%">
                    <div class="text-center py-8">No alerts created yet!</div>
                </td>
            </tr>

            <tr v-else
                v-for="item in items"
                :key="item.id"
            >
                <td>{{ item.created_at }}</td>
                <td>

                    <template v-if="isDemoUser">
                        {{ item.query }}
                    </template>

                    <a v-else href="#" @click.prevent="editAlertClicked(item)">{{ item.query }}</a>

                </td>
                <td>{{ item.post_count_hour }}</td>
                <td>{{ item.post_count_day }}</td>

                <td>

                    <v-btn
                            icon
                            color="red"
                            variant="text"
                            size="x-large"
                            @click="deleteClicked(item)"
                            :disabled="isDemoUser"
                    >
                        <v-progress-circular
                                v-if="item.busy"
                                indeterminate
                                color="red"
                                size="24"
                        ></v-progress-circular>

                        <v-icon v-else size="x-large">mdi-delete</v-icon>

                    </v-btn>
                </td>

            </tr>
            </tbody>
        </v-table>


    </div>
</template>

<script setup lang="ts">
import api from "~/api";
import {parseISO, formatDistanceToNow} from 'date-fns';
import {ref} from 'vue';
import TableRowLoading from "~/components/partials/TableRowLoading.vue";
import type {RedditAlert, WithBusy} from "~/types";
import {useAuthStore} from "~/store";

useHead({
    title: 'Alerts - RedditWatch'
});

const {isDemoUser} = useAuthStore();

interface TableItem extends WithBusy, RedditAlert {
}

const refState = ref({
    isLoading: true
});

const isAlertDialogOpen = ref(false);
const selectedAlert = ref<TableItem | null>();

const items = ref<TableItem[]>([]);

const newAlertClicked = (item: TableItem) => {
    selectedAlert.value = null;
    isAlertDialogOpen.value = !isAlertDialogOpen.value;
};

const editAlertClicked = (alertObj: TableItem) => {

    isAlertDialogOpen.value = true;
    selectedAlert.value = alertObj;
}

const deleteClicked = async (item: TableItem) => {

    if (confirm('Are you sure?')) {
        item.busy = true;

        api.deleteAlert(item.id).then(() => {
            loadItems();
        }).catch((err) => {
            alert(err);
        }).finally(() => {
            item.busy = false;
        });
    }
}

const loadItems = async () => {

    try {

        refState.value.isLoading = true;
        items.value = [];

        const response = await api.alerts();

        const {data} = response;

        for (const item of data) {

            const date = parseISO(item.created_at);
            const addedAgo = formatDistanceToNow(date, {addSuffix: true});

            item.created_at = addedAgo;

            const detailed = {
                ...item, ...{
                    created_at: addedAgo,
                    post_count_hour: item.matches?.past_hour,
                    post_count_day: item.matches?.past_day
                }
            };

            items.value.push(detailed);
        }

    } catch (error) {
        alert(error);
    } finally {
        refState.value.isLoading = false;
    }
};

onMounted(loadItems);

</script>
