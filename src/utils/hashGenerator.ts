import bcrypt from "bcryptjs";

function titleCase(s: string) {
    if (!s) return s;
    return s
        .replace(/[-_.]+/g, " ")
        .split(" ")
        .filter(Boolean)
        .map(part => part[0].toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}

function printUsage() {
    console.error(
        [
            "Usage:",
            "  yarn gen-hash <username> <password>",
            "",
            "Examples:",
            "  yarn gen-hash uma 'Temp@1234'",
            "  yarn gen-hash joe hunter2",
        ].join("\n")
    );
}

const [, , username, password] = process.argv;

if (!username || !password) {
    printUsage();
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const name = titleCase(username);

const line = `{ id: "${username}", name: "${name}", hash: "${hash}" },`;

console.log(line);
