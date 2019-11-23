# CJ gotta catch 'em all!

After years of coding, CJ decided to abandon everything and start following his dream: to become the best Pokemon trainer ever!

60 secs. This is all the time you have to click on moving Pokemons and name it correctly. If you success, CJ will catch this Pokemon. If you fail, no candy for you.

## What is your motivation for creating this project?

The best resume one can have is an online portfolio. I think this idea implemented with some flavouring will be fun and a nice personal accomplishment.

## How will users interact with your web site?

A grid of moving Pokemons. Click on one of them and be sure to type the correct name of it.

## What 3rd Party API(s) will you integrate with?

https://pokeapi.co/docs/v2.html

## Tech Stack

- Only plain css (actually sass).
- No 3rd party libraries, but only the necessary to compile Typescript.

## Will you try to implement any stretch features?

What is being added:

- Build process with [Webpack](https://webpack.js.org/) to transpile [Typescript](https://www.typescriptlang.org/) code.
  - This must provide both build process and live transpile on change detection.
- Semantic HTML
  - HTML, as a markup language, is semantic in nature. That means every tag has it's motive in mind.
  - Sadly, with the naive use of popular CSS frameworks, we move from table hell to div hell.
- [Sass](https://sass-lang.com/).
  - Included during the build process.
  - Sass give us the ability to use nested rules, mixins, functions and much more.
- Sprite images.
  - Sprite with Sass is soo good! :)
  - Downloaded from [Veekun](https://veekun.com/dex/downloads).
- CSS grid.
  - No need for column based site made with a css framework nowadays.
- A good documentation.
  - The clean code you write is the best documentation ever.
  - Even so, some additional and clever writing is always welcomed.
- A good project structure and organization.
  - /assets for images.
  - /sass for styling.
  - /src for main Typescript code.
  - /src/lib for shared Typescript code.
    - Consider a separate repo for your libs and import it, or go with a [monolithic approach](https://en.wikipedia.org/wiki/Monorepo).
  - /view for web components
    - Every web component has it's own folder. On there, there is the html file and .ts file.
- Tests with Jest.
  - All test files ends with **.spec.ts**.
  - I recommend you to use the VsCode Jest extension. With it enabled, all tests are made realtime with the possibility to debug on the fly (sometimes it crashes, if so reload window).
- Mobile first
  - Unless on very specific cases, this is a must for every project nowadays.
- WebComponents (with Typescript!)
  - Web Component is somehow a way to let us extends the HTML elements to create new custom and reusable HTML.
  - Separation of concern between presentation (remote fetched template) and controller (with a custom solution to build web components).
  - No shadow CSS was used (yet).
- [SPA](https://en.wikipedia.org/wiki/Single-page_application).
- Observer Pattern to share state.
  - This means that the state is shared between subscription as such on Observer Pattern. For example, whatever component/class that has a shareable state provides a subscription so others can be notified on this state change.
- Mix between an OO approach and functional programming.

What I may add:

- UI animation (will try without adding a lib).
- PWA.

## What will be your process?

Although motivated, I have to split my focus between this project, my work, family, other projects and a specialization. So I may not be able to finish it on 1.5 week.

As this is not a complex project, I decided to not use a project management.

For UX/UI I made some draws and notes, then plan to sketch up on HTML later.
