import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import FONTFAMILY from '../../constants/fonts';
import {screen_width} from '../../utils/Dimensions';

export const styles = StyleSheet.create({
  container: {flex: 1},

  tabs: {
    width: screen_width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
  },
  tab: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary.blue,
    borderColor: COLORS.primary.blue,
    borderWidth: 3,
  },
  border: {
    borderColor: COLORS.secondary.white,
    borderWidth: 3,
  },
  tabTitle: {...FONTFAMILY.MONTSERRAT.reg.pt16, color: COLORS.secondary.white},
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary.black,
    backgroundColor: COLORS.secondary.greySix,
  },
  messageText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
  messageDate: {
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
    color: COLORS.secondary.greyOne,
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary.white,
  },
  fabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    tintColor: COLORS.secondary.white,
  },
  noMessagesText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyBox: {},
});
