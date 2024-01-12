import { marked } from 'marked';
import * as timeago from 'timeago.js'

export const renderView = async (viewKey: string, params: any) => {
    const viewFile = Bun.file('src/views/' + viewKey + '.literally.html');
    const viewFileContents = await viewFile.text();
    const render = compile(viewFileContents);

    const renderedView = render(params)

    return renderedView;
}


// SOURCE: https://raw.githubusercontent.com/Drulac/template-literal/master/compile.js
// Author did not provide TS Type declarations, it was easier to copy than to provide declarartion 
const compile = function (templateStr: string) {
    const compilerFunc = new Function(
        'd',
        'const include = (file, opts={})=>d.include(file+".tl", Object.assign(d, opts)); return `' +
        templateStr +
        '`'
    )

    return (d: any) => {
        const renderMarkdown = (txt: string) => marked.parse(txt)
        const formatDate = (d: Date) => timeago.format(d, "en_US")
        return compilerFunc({ ...d, ...{ formatDate, renderMarkdown } })
    }
}