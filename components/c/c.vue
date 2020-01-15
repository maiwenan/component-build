<script>
import A from 'components/a';

export default {
  props: {
    text: String
  },

  render() {
    const {
      text
    } = this;
    const props = {
      msg: text
    };

    return (
      <div class="gs-c">
        <div>pring c</div>
        <A {...{props: props}} title={text} />
      </div>
    );
  },

  mounted() {
    console.log('c');
  }
};
</script>
