<template>
    <div>
        <table class="table table-condensed">
            <tbody>
            <tr>
                <td class="text-nowrap">
                    <code>apples oranges</code>
                </td>
                <td>will attempt to match text that contains either "apples" or "oranges".</td>
            </tr>

            <tr>
                <td class="text-nowrap">
                    <code>+apples +oranges</code>
                </td>
                <td>must contain both "apples" AND "oranges". If either word is missing, then it's a no match.</td>
            </tr>

            <tr>
                <td class="text-nowrap">
                    <code>apples -oranges</code>
                </td>
                <td> should contain the word "apples", but MUST NOT contain "oranges".</td>
            </tr>

            <tr>
                <td class="text-nowrap">
                    <code>"buy pl*"</code>
                </td>
                <td>Will match terms like "<strong>buy pl</strong>ane tickets", "<strong>buy pl</strong>aystation",
                    etc...
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
table td {
    font-size: 1rem !important;
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
</style>