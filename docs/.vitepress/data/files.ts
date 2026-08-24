/**
 * Every artifact this project holds or knows about: firmware images, tweak packages, guides.
 *
 * ⚠️ The hashes below were **generated from the files themselves**, not transcribed. A mistyped hash is
 * worse than no hash — it would tell a reader their download is sound when it is not. `bun run
 * verify:files` (see `tools/`) re-checks them against `downloads/CHECKSUMS.sha256`.
 *
 * This project hosts none of these files. It publishes hashes and provenance so a reader can verify
 * whatever they obtained, wherever they obtained it. See `/firmware/obtaining`.
 *
 * Status vocabulary is defined in `types.ts` and explained on `/reference/`.
 */

import type { FileStatus, Market } from "./types";

export interface Artifact
{
    /** Path relative to the git-ignored `downloads/` directory, where we hold it locally. */
    path: string;
    filename: string;
    kind: "firmware" | "tweak" | "document" | "bundle";
    market?: Market;
    version?: string;
    bytes: number;
    sha256: string;
    md5: string;
    status: FileStatus;
    /** Where our copy came from. */
    provenance: "mazda-cdn" | "community-bundle" | "author";
    /** VirusTotal outcome. `too-large` means it exceeds the analysis cap and can never be scanned. */
    scan: "clean" | "too-large" | "flagged" | "not-run";
    sourceIds: string[];
    notes: string;
}

export const ARTIFACTS: readonly Artifact[] = [
    {
        path: "ameridan/2018_Connect_CMU_Software_Update_Procedure.pdf",
        filename: "2018_Connect_CMU_Software_Update_Procedure.pdf",
        kind: "document",
        bytes: 778657,
        sha256: "2c347d3dcd16328f85f6d19af94320998807846d34a3223d94a4db7027eab54d",
        md5: "dd04b1b56843d37bc992ebf80dd5ad31",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["D-04"],
        notes: "Mazda's own 30-step update procedure."
    },
    {
        path: "ameridan/Fix_ver70_NNG.zip",
        filename: "Fix_ver70_NNG.zip",
        kind: "tweak",
        bytes: 33811815,
        sha256: "f3e3f7289a12a1e5d97e47f5a62d7232ba7959948f57521f7c93a0eede7b3f17",
        md5: "061dd111a8a4b421f1240aa491ad4df7",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-02"],
        notes: "Standalone navigation fix; the same payload is inside MazdaToFiatV70AIO."
    },
    {
        path: "ameridan/Fully-Disable-Touchscreen.zip",
        filename: "Fully-Disable-Touchscreen.zip",
        kind: "tweak",
        bytes: 35215,
        sha256: "24bad77f82421e871ee8889d97490eb2d7df1be3dd41fe3c5fda5a6d135b579c",
        md5: "a3989508ea7b4711baa856fc4542337d",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-15"],
        notes: "Ghost-touch workaround."
    },
    {
        path: "ameridan/JCI_Test_Mode_Control.zip",
        filename: "JCI_Test_Mode_Control.zip",
        kind: "tweak",
        bytes: 42029,
        sha256: "59f103ca59c548fdc1a6edd73a9bba274e157f5709efe8ed230706a5749ed6fb",
        md5: "cad52a5f8ebc00eda32f276b8c052641",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-08"],
        notes: "Adds a button reaching JCI test mode, including the terminal the mp3 method later triggers without a " +
            "tweak."
    },
    {
        path: "ameridan/MazdaToFiatV70AIO.zip",
        filename: "MazdaToFiatV70AIO.zip",
        kind: "tweak",
        bytes: 37724156,
        sha256: "9d8fe6d8107ee038295e19a3a7c578f34530adbbdcd3321a26d4f3c8d7c58b20",
        md5: "cd9f2a38cadb465aa00d977e6788078b",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-01"],
        notes: "The single tool that matters: Fiat/Abarth branding, boot animations, CarPlay icon, " +
            "factory-navigation " +
            "restore and the Bluetooth name."
    },
    {
        path: "ameridan/RemoveNNG.zip",
        filename: "RemoveNNG.zip",
        kind: "tweak",
        bytes: 99594,
        sha256: "34cf324c91bc361f59daf0a41bf7b23014c2ba098cdf0073288b1ef0142585c6",
        md5: "3396018f2c3bd21c689d5611e934e8ea",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-08"],
        notes: "Frees ~18 MB by deleting the navigation engine. Pre-dates the navigation fix."
    },
    {
        path: "ameridan/StatusBar_Tweak.zip",
        filename: "StatusBar_Tweak.zip",
        kind: "tweak",
        bytes: 84688,
        sha256: "f31f3cedee97d596d1f804b7fccfdacae48dd57a1835716a13fb43feae1d2747",
        md5: "0f8c7c5b530fbb998a384cbfd8b8944d",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-14"],
        notes: "Date in the status bar."
    },
    {
        path: "ameridan/USB_Tweak.zip",
        filename: "USB_Tweak.zip",
        kind: "tweak",
        bytes: 83819,
        sha256: "70622083b88118da6b1801a39a375f1ce8b00b129552cde25d45dd2e5b80077d",
        md5: "eae2c52ff066bf3ff629333dd716112a",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-13"],
        notes: "USB audio mod. v55–59.00.449 only, NOT v70."
    },
    {
        path: "ameridan/Uninstall_Animations_Tweak.zip",
        filename: "Uninstall_Animations_Tweak.zip",
        kind: "tweak",
        bytes: 33683,
        sha256: "9cd7ebbeb331eac1008ce58cd6a3a080e3d5189b7fd260d22ab3326a8fcf1487",
        md5: "c4309ca4c65f9e2b7422d865163fd4ce",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-07"],
        notes: "Reverts the animations."
    },
    {
        path: "ameridan/Version_70_Abarth_Boot.zip",
        filename: "Version_70_Abarth_Boot.zip",
        kind: "tweak",
        bytes: 1479637,
        sha256: "6d1e2e74484a6f53e3fbf641f4cac2681963846952272595701b994e6fb4b420",
        md5: "c0a757189e21a7dea0c943c2c9e70afb",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-07"],
        notes: "Standalone Abarth boot animation."
    },
    {
        path: "ameridan/Version_70_Fiat_Boot.zip",
        filename: "Version_70_Fiat_Boot.zip",
        kind: "tweak",
        bytes: 1485535,
        sha256: "d73bd3518ac775393db66ed1f2564f7b56f9abce2d0c638973427bb2361f48cb",
        md5: "7cc0609de7b57dd0c3c8a9c46497b2c5",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-07"],
        notes: "Standalone Fiat boot animation."
    },
    {
        path: "ameridan/autorun_copy_to_usb.zip",
        filename: "autorun_copy_to_usb.zip",
        kind: "tweak",
        bytes: 46659,
        sha256: "c8bef694b1dcae78881ad57b9df8fdba09f073ee93d3ca89c9382c7315572726",
        md5: "930b3deb736a0b22ea0072397cd4b362",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["B-05"],
        notes: "ID7 v1. Installs three UID-0 accounts and an SSH daemon — see the security pages before using it."
    },
    {
        path: "firmware/NA/cmu150_NA_59.00.502A_failsafe.up",
        filename: "cmu150_NA_59.00.502A_failsafe.up",
        kind: "firmware",
        market: "NA",
        version: "59.00.502A",
        bytes: 7045747,
        sha256: "cfe846acb68af8673f9985370ac1eaa6c58082acba77580668ce67e7619a5f79",
        md5: "46006213b4a7d527036f764403738f6f",
        status: "collected",
        provenance: "mazda-cdn",
        scan: "clean",
        sourceIds: ["D-01"],
        notes: "Pre-CarPlay; the version that closed USB side-loading."
    },
    {
        path: "firmware/NA/cmu150_NA_59.00.545A_failsafe.up",
        filename: "cmu150_NA_59.00.545A_failsafe.up",
        kind: "firmware",
        market: "NA",
        version: "59.00.545A",
        bytes: 7061576,
        sha256: "79168c8c2359495d5ecb9927b5dddc80062b7f52020b3e8a63656501b7f2e427",
        md5: "bbdc6c1048b7cd8320098b2afa8cf12b",
        status: "collected",
        provenance: "mazda-cdn",
        scan: "clean",
        sourceIds: ["D-01"],
        notes: "Pre-CarPlay."
    },
    {
        path: "firmware/NA/cmu150_NA_70.00.021B_failsafe.up",
        filename: "cmu150_NA_70.00.021B_failsafe.up",
        kind: "firmware",
        market: "NA",
        version: "70.00.021B",
        bytes: 7089899,
        sha256: "8835f4444cb0d05d2ad6c973e95fdf62ec1be28946a5f32121ac19b9ff830ee1",
        md5: "d342b61016901cec7e7a61d71d53c53b",
        status: "collected",
        provenance: "mazda-cdn",
        scan: "clean",
        sourceIds: ["D-01"],
        notes: "No community hash found to compare against."
    },
    {
        path: "firmware/NA/cmu150_NA_70.00.100A_failsafe.up",
        filename: "cmu150_NA_70.00.100A_failsafe.up",
        kind: "firmware",
        market: "NA",
        version: "70.00.100A",
        bytes: 7088769,
        sha256: "ef9964509d81d47c1fcae35748096fe7021a9ea15b670acf5675a48679ddbccf",
        md5: "9324d1907c2c722738b0a389de73e91d",
        status: "verified-pending-AV",
        provenance: "mazda-cdn",
        scan: "clean",
        sourceIds: ["D-01"],
        notes: "Failsafe half of the community target. MD5 matches the community-published value."
    },
    {
        path: "firmware/NA/cmu150_NA_70.00.367A_update.up",
        filename: "cmu150_NA_70.00.367A_update.up",
        kind: "firmware",
        market: "NA",
        version: "70.00.367A",
        bytes: 967219802,
        sha256: "2c46f3f08ac9f93f72a6e15878eb3230c6a3a6f48ce0e4e1034508170cc8ded4",
        md5: "648dc7443ba99af8abd483f20673c295",
        status: "verified-pending-AV",
        provenance: "mazda-cdn",
        scan: "too-large",
        sourceIds: ["D-01"],
        notes: "MD5 matches the community-published value."
    },
    {
        path: "firmware/NA/cmu150_NA_74.00.324A_update.up",
        filename: "cmu150_NA_74.00.324A_update.up",
        kind: "firmware",
        market: "NA",
        version: "74.00.324A",
        bytes: 1003179676,
        sha256: "ffd04e2c8cfaf77388aacde0f9c1cddc17cb6b7f02d7caa2fe6ad39c0f40e787",
        md5: "49c7c7a834ca40cbbbb68f29ee696475",
        status: "verified-pending-AV",
        provenance: "mazda-cdn",
        scan: "too-large",
        sourceIds: ["D-01"],
        notes: "The final firmware. MD5 matches the community-published value."
    },
    {
        path: "firmware/NA/cmu150_NA_70.00.100A_reinstall.up",
        filename: "cmu150_NA_70.00.100A_reinstall.up",
        kind: "firmware",
        market: "NA",
        version: "70.00.100A",
        bytes: 925592239,
        sha256: "5938019df7e333447c7bf60aa8f6a7e7f9cd50d6eeb7b6e33605800b85bd4ad0",
        md5: "da7667967e62e324c4ef457de4a262bf",
        status: "verified-pending-AV",
        provenance: "mazda-cdn",
        scan: "too-large",
        sourceIds: ["D-01"],
        notes: "Main OS half. MD5 matches the community-published value. Over VirusTotal's analysis cap."
    },
    {
        path: "tweaks/ID7_Recovery_XX.zip",
        filename: "ID7_Recovery_XX.zip",
        kind: "tweak",
        bytes: 117907,
        sha256: "e6b778079bd61212ae49b88cf1c846b40c0dcb5f59252c0b2396f5f8aa867daa",
        md5: "da345204165dbd07d46c019c463a04b1",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["C2-22"],
        notes: "ID7 v2 recovery pack. Ships an undocumented 220 KB stripped ARM binary named adb."
    },
    {
        path: "guides/124Spider_CP_AA_Upgrade_Guide.zip",
        filename: "124Spider_CP_AA_Upgrade_Guide.zip",
        kind: "document",
        bytes: 7807128,
        sha256: "59725fe002d9f05fb4e168dd4a64e71220b01c9f172cf7674d7e0f47171743b0",
        md5: "e80095144159ca2b9cb4931b2e992125",
        status: "collected",
        provenance: "author",
        scan: "flagged",
        sourceIds: ["A-02"],
        notes: "68wooley's guide. ESET alone flags PDF/Phishing.A.Gen on Part 1; the file has no active content at " +
            "all and the detection is a false positive — but the 9 links it contains include a now-hijacked domain."
    },
    {
        path: "tweaks/mzd-connect-1-root-main.zip",
        filename: "mzd-connect-1-root-main.zip",
        kind: "tweak",
        bytes: 132338,
        sha256: "95690ef15f38712568e4eb5c9eb03a2de92ab590fc494473ed1b28f20bfb7ca6",
        md5: "99d25687144a198b000eb1b84c4a2365",
        status: "collected",
        provenance: "author",
        scan: "clean",
        sourceIds: ["C2-23"],
        notes: "The mp3-method payload. Installs no credentials, no sshd and no persistence."
    },
    {
        path: "firmware/EU/cmu150_EU_70.00.100A_failsafe.up",
        filename: "cmu150_EU_70.00.100A_failsafe.up",
        kind: "firmware",
        market: "EU",
        version: "70.00.100A",
        bytes: 7078085,
        sha256: "3e3fd46dac1f9d1c8998c5384b1098fa86637ceadd03f47939831cce852cd668",
        md5: "cc485f4f16541cd803f615df42dc3512",
        status: "verified-pending-AV",
        provenance: "community-bundle",
        scan: "clean",
        sourceIds: ["A-12"],
        notes: "MD5 matches the community-published value."
    },
    {
        path: "firmware/EU/cmu150_EU_70.00.100A_reinstall.up",
        filename: "cmu150_EU_70.00.100A_reinstall.up",
        kind: "firmware",
        market: "EU",
        version: "70.00.100A",
        bytes: 2355206863,
        sha256: "8728a4e682c8ab3e1b586cfe564e35c3af052b770c8f12cddd855bd501e8c4c6",
        md5: "d5c042588b5de7f0d72e02b03ec78590",
        status: "verified-pending-AV",
        provenance: "community-bundle",
        scan: "too-large",
        sourceIds: ["A-12"],
        notes: "MD5 matches d5c042..., settling a long-standing contradiction with a rival 279f1b81... value that " +
            "turned out to be a bad copy. Both sources for the good value are Google Drive re-hosts and may share an " +
            "upstream."
    },
    {
        path: "firmware/ADR/cmu150_ADR_70.00.100A_failsafe.up",
        filename: "cmu150_ADR_70.00.100A_failsafe.up",
        kind: "firmware",
        market: "ADR",
        version: "70.00.100A",
        bytes: 7089960,
        sha256: "e5910a9ce0cac9fbe3c3cd5e2b0dac3de282c1b256e67509e89f4a9d814146b1",
        md5: "46d7a81af84845eea30557146221f303",
        status: "verified-pending-AV",
        provenance: "community-bundle",
        scan: "clean",
        sourceIds: ["A-12"],
        notes: "MD5 matches the community-published value, from a different source lineage than the EU pair."
    },
    {
        path: "firmware/ADR/cmu150_ADR_70.00.100A_reinstall.up",
        filename: "cmu150_ADR_70.00.100A_reinstall.up",
        kind: "firmware",
        market: "ADR",
        version: "70.00.100A",
        bytes: 1917094531,
        sha256: "94b245a854ad706c139b9635e3841d19c81d9a5c89dccbe03b4baf76af9736c5",
        md5: "afb5cf9ac044459c2a494c6b1eb46dd9",
        status: "verified-pending-AV",
        provenance: "community-bundle",
        scan: "too-large",
        sourceIds: ["A-12"],
        notes: "MD5 matches the community-published value."
    },
    {
        path: "firmware/EU/FIAT_124_CarPlay_files_EU.zip",
        filename: "FIAT_124_CarPlay_files_EU.zip",
        kind: "bundle",
        market: "EU",
        bytes: 2409562234,
        sha256: "facdba3ba166465e319adb49a135b1da0aebafea5f7699c40cb611f0b83ad47b",
        md5: "a66ae4a0109c348c970d247caf0d4b25",
        status: "collected",
        provenance: "community-bundle",
        scan: "too-large",
        sourceIds: ["A-12"],
        notes: "The EU community bundle: firmware plus the tweak packages, all byte-identical to their originals."
    },
    {
        path: "firmware/ADR/FIAT_124_CarPlay_files_ADR.zip",
        filename: "FIAT_124_CarPlay_files_ADR.zip",
        kind: "bundle",
        market: "ADR",
        bytes: 1971867943,
        sha256: "b637dbe05a848a7de35416205b556430b21408f2a32b25fe9044c181beab9779",
        md5: "4b093a2961de258d442d3488419867eb",
        status: "collected",
        provenance: "community-bundle",
        scan: "too-large",
        sourceIds: ["A-12"],
        notes: "The ADR community bundle."
    }
];

/** Firmware we hold, grouped by the market it belongs to. */
export const FIRMWARE_ARTIFACTS = ARTIFACTS.filter((a) => a.kind === "firmware");

/**
 * Files that can never be scanned: they exceed VirusTotal's analysis cap, so for these the only
 * available evidence is a matching community-published MD5.
 */
export const UNSCANNABLE = ARTIFACTS.filter((a) => a.scan === "too-large");
