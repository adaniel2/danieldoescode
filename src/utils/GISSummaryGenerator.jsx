import { filesize } from "filesize";

export default function generateJSONSummary(file) {
    return { fileName: file.name, fileSize: filesize(file.size, {standard: "jedec"}) };
}