<script lang="ts" setup>
// The two version walls, from `research/FIRMWARE-MATRIX.md` §3. Static by design: this is a
// reference table, not something to filter.

    interface Row
    {
        from: string;
        to: string;
        method: string;
        caveat?: string;
    }

    const ROWS: Row[] = [
        {
            from: "70.00.021 / 70.00.100",
            to: "59.00.545 or 59.00.502",
            method: "USB, the same procedure as an upgrade",
            caveat: "Sources disagree on the file order. Both have worked; one owner ended with a " +
                "mismatched pair that ran but is an undefined state."
        },
        {
            from: "70.00.335 / 352 / 367",
            to: "70.00.100 or 59.00.502+",
            method: "USB",
            caveat: "Coming back down does NOT restore tweak access — the credentials are already gone."
        },
        { from: "70.00.367", to: "70.00.352", method: "USB", caveat: "The documented escape from 367." },
        { from: "74.00.230", to: "70.x or 59.00.502+", method: "USB — bench-tested" },
        {
            from: "74.00.310 / 311 / 324",
            to: "anything below 74.00.310",
            method: "Not possible over USB",
            caveat: "Only with an SPI-NOR programmer: write a 70.00.100 failsafe dump and set the boot-select byte."
        },
        {
            from: "59.00.502 and above",
            to: "anything below 59.00.502",
            method: "Not possible over USB",
            caveat: "The update screen simply does not list lower versions. Only via SPI-NOR."
        },
        {
            from: "Mazda 70.x",
            to: "Fiat 59.00.5xx",
            method: "No report of anyone doing it",
            caveat: "Fiat packages do not circulate at all. Treat as impossible until someone demonstrates otherwise."
        }
    ];
</script>

<template>
    <div class="downgrade-matrix">
        <table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>How</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, i) in ROWS" :key="i">
                    <td class="nowrap">
                        {{ r.from }}
                    </td>
                    <td class="nowrap">
                        {{ r.to }}
                    </td>
                    <td>
                        {{ r.method }}
                        <div v-if="r.caveat" class="caveat">
                            {{ r.caveat }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.downgrade-matrix { margin: 16px 0; }

table
{
    display: block;
    width: 100%;
    overflow-x: auto;

    border-collapse: collapse;
    font-size: 14px;
}

th,
td
{
    padding: 8px 10px;
    border-bottom: 1px solid var(--vp-c-divider);
    text-align: left;
    vertical-align: top;
}

th { background-color: var(--vp-c-bg-soft); font-weight: 600; }

.nowrap { white-space: nowrap; }

.caveat
{
    margin-top: 4px;
    color: var(--vp-c-text-2);
    font-size: 13px;
    line-height: 20px;
}
</style>
