import {StyleSheet} from 'react-native';
import {colors} from '../../constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topV: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cateV: {
    position: 'absolute',
    right: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 8,
  },
  searchV: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  productItemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDescription: {
    color: '#777',
  },
});
