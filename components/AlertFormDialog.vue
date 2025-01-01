<template>
    <v-dialog
            v-model="dialog"
            max-width="800">

        <v-card>
            <v-card-text>

                <v-row class="">
                    <v-col cols="12">
                        <v-text-field
                                v-model="form.query"
                                label="Search query:"
                                placeholder="Enter your search terms"
                                outlined
                                dense
                        ></v-text-field>

                        <p class="text-muted">
                            Common boolean operators supported. See examples below.
                        </p>

                    </v-col>
                </v-row>

                <v-row class="">
                    <v-col cols="12" class="flex-row">

                        <div style="display: inline-flex; align-items: center; gap: 16px;">

                            <v-checkbox
                                    v-model="form.search_title"
                                    label="Search post titles"
                                    dense
                            ></v-checkbox>
                            <v-checkbox
                                    v-model="form.search_text"
                                    label="Search inside post text"
                                    dense
                            ></v-checkbox>
                            <v-checkbox
                                    v-model="form.search_url"
                                    label="Search in URL"
                                    dense
                            ></v-checkbox>

                        </div>

                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-btn color="primary" block @click="saveChangesClicked" :loading="form.isLoading">
                            <template v-if="isUpdating">Update Alert</template>
                            <template v-else>Add New Alert</template>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row v-if="form.error" class="bg-red-lighten-4 border outlined">
                    <v-col cols="12">
                        {{ form.error }}
                    </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row>
                    <v-col cols="12">
                        <search-operators></search-operators>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script setup lang="ts">
import SearchOperators from "~/components/partials/SearchOperators.vue";
import api from "~/api";

const dialog = defineModel(
    {required: true, type: Boolean, default: true}
);

const props = defineProps({
    alert: {
        type: Object,
        required: false,
    },
});

const isUpdating = computed(() => {
    return !!(props.alert && props.alert.id);
});

const form = reactive({
    isLoading: false,
    error: null,

    // API fields
    query: '',
    search_title: false,
    search_text: false,
    search_url: false
});

watch(() => props.alert, (newValue, oldValue) => {

    if (newValue) {
        form.query = newValue.query;
        form.search_title = !!newValue.search_title;
        form.search_text = !!newValue.search_text;
        form.search_url = !!newValue.search_url;
    } else {
        form.query = '';
        form.search_title = false;
        form.search_text = false;
        form.search_url = false;
    }

});

async function saveChangesClicked() {

    // are we updating or creating id?
    const obj = props.alert;

    form.error = null;
    form.isLoading = true;

    const params = {...form};

    if (isUpdating.value) {

        await api.updateAlert(obj.id, params).then(() => {
            window.location.reload();
        }).catch((error) => {
            form.error = error;
        }).finally(() => {
            form.isLoading = false;
        });

    } else {

        await api.newAlert(params).then(() => {
            window.location.reload();
        }).catch((error) => {
            form.error = error;
        }).finally(() => {
            form.isLoading = false;
        });
    }
}

</script>

<style scoped>

</style>