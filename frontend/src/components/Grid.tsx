import { Grid, Image, Input, Segment, SemanticWIDTHS } from "semantic-ui-react";

type gridProps = {
  width: SemanticWIDTHS;
  src: string;
};

const GridExampleDividedNumber = ({ width, src }: gridProps) => (
  <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
      <Grid.Column>
        <Image src={src} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default GridExampleDividedNumber;
