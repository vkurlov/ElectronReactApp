export default function parserIniText<TObj extends { [key: string]: any }>(iniText: string): TObj {
    const result: any = {};

    if (!iniText || typeof iniText !== 'string') {
        return result;
    }
    const regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    const lines = iniText.split(/[\r\n]+/);
    let section: string | null = null;

    lines.forEach((line) => {
        if (regex.comment.test(line)) {
            return;
        } else if (regex.param.test(line)) {
            const match = line.match(regex.param);
            if (section) {
                result[section][match![1]] = match![2];
            } else {
                result[match![1]] = match![2];
            }
        } else if (regex.section.test(line)) {
            const match = line.match(regex.section);
            result[match![1]] = {};
            section = match![1];
        } else if (line.length === 0 && section) {
            section = null;
        }
    });
    return result;
}