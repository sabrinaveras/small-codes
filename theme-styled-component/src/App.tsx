import * as ds from "./design";

function App() {
  return (
    <>
      <ds.typographies.title.component>
        Um Título
      </ds.typographies.title.component>

      <ds.typographies.subTitle.component>
        Um Sub Título
      </ds.typographies.subTitle.component>

      <ds.typographies.button.component>
        Um texto do botão
      </ds.typographies.button.component>

      <ds.typographies.link.component>
        Um texto do link
      </ds.typographies.link.component>
    </>
  );
}

export default App;
