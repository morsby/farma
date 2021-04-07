# farma.morsby.dk

## Om siden

[farma.morsby.dk](https://farma.morsby.dk) er min gamle notesamling til
farmakologi, et fag jeg tog som stud.med. på Aarhus Universitet i
efteråret 2014. Siden har efterfølgende overlevet og bruges fortsat. Den har
oprindeligt været kodet på en måde, jeg ikke kunne se mig selv vedligeholde. Jeg
har derfor i foråret 21 benyttet noget fritid og ankomsten af den offentlige
beta af [sveltekit](https://kit.svelte.dev/) til at kode siden om (mere om
teknologien nedenfor).

Via siden vil det blive muligt at komme med forslag til nye stoffer, rettelser
til listen eller rettelser til de enkelte stoffers noter. Det vil alt sammen
komme ind som et "Issue" [her](https://github.com/morsby/farma/issues) på
Github.

## Tech stack

### Noter

Noterne findes i markdown-format i mappen
[/src/lib/drugs](https://github.com/morsby/farma/tree/master/src/lib/drugs). Der
mangler i skrivende stund noget oprydning i metadataene.

### App'en

- Appen er skrevet i frameworket [SvelteKit](https://kit.svelte.dev/) med
  adapter til netlify.
- Kodes i JavaScript og i et vist omfang
  [TypeScript](https://www.typescriptlang.org/).
- Styling benytter [TailwindCSS](https://tailwindcss.com/)
- Hosting på [netlify](https://www.netlify.com/) med serverless functions (via
  netlify-adapteren til SvelteKit)

### Brug

1. `git clone`
2. `npm install`
3. `npm run dev`
