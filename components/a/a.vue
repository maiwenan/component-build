<script>
import utils from 'components/utils';

export default {
  props: {
    msg: String
  },

  render() {
    const {
      msg
    } = this;

    return (
      <div class="gs-a">{msg}</div>
    );
  },

  mounted() {
    utils.add('a');
  }
};
</script>
