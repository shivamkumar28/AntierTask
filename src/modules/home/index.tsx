import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  ListRenderItem,
  Image,
} from 'react-native';
import {styles} from './style';
import {colors} from '../../constant';
import {useEffect, useState} from 'react';
import {fetchProduct, fetchProductBySearch} from '../../provider/api-services';
import {useDispatch} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProductData(0);
  }, []);

  const fetchProductData = async (skip: number) => {
    setLoading(true);
    try {
      const res: any = await fetchProduct({skip});
      // console.log('Response:', JSON.stringify(res));
      if (res && res.products) {
        setProducts(prevProducts => [...prevProducts, ...res.products]);
        setTotal(res.total);
        setSkip(skip + 1);
      }
    } catch (e) {
      console.error('Error fetching products:', JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (searchTxt: string) => {
    setLoading(true);
    setIsSearching(true);
    setProducts([]); // Clear previous products
    setSkip(0); // Reset pagination
    try {
      const res: any = await fetchProductBySearch({searchTxt});
      console.log('Search Response:', JSON.stringify(res));
      if (res && res.products) {
        setProducts(res.products);
        setTotal(res.total);
      }
    } catch (e) {
      console.error('Error searching products:', JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  const topBar = () => {
    return (
      <View style={styles.topV}>
        <Text style={{fontWeight: '600', fontSize: 18}}>{'Product'}</Text>
        <View style={styles.cateV}>
          <Text style={{color: colors.black}}>{'Category'}</Text>
        </View>
      </View>
    );
  };

  const searchBox = () => {
    return (
      <View style={styles.searchV}>
        <TextInput
          value={searchText}
          onChangeText={(val: string) => setSearchText(val)}
          placeholder={'Search Products'}
          placeholderTextColor={colors.black}
          style={{color: colors.black}}
          onSubmitEditing={(val: any) => {
            console.log(val?.nativeEvent?.text);
            if (!!val?.nativeEvent?.text.trim()) {
              searchProducts(val?.nativeEvent?.text);
            } else {
              fetchProductData(0);
            }
          }}
        />
      </View>
    );
  };

  const renderProduct: ListRenderItem<any> = ({item}) => {
    return (
      <View style={styles.productItemContainer}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const loadMore = () => {
    if (!loading && skip < total && !isSearching) {
      fetchProductData(skip);
    }
  };

  return (
    <View style={styles.container}>
      {topBar()}
      {searchBox()}
      <View style={{flex: 1, marginTop: 18}}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" /> : null
          }
        />
      </View>
    </View>
  );
};

export default Home;
