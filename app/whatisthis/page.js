import { remark } from 'remark'
import html from 'remark-html'
import { promises as fs } from 'fs'

const Page = async ({ params }) => {
    const content = await fs.readFile('app/whatisthis/info.md', 'utf8')
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    return (
        <>
            <div><a href="/">Return to the prover.</a></div>
            <div className="info" dangerouslySetInnerHTML={{ __html: contentHtml }}/>
            <div><a href="/">Return to the prover.</a></div>
        </>
    )
}

export default Page
