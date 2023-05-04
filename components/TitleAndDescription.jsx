import { View, Text } from 'react-native';
import Headings from 'js-tenancy-core/components/typography/Headings';

const TitleAndDescription = ({ title, description}) => {
    return (
        <View className="">
            <Headings.Primary title={title} />
            <View className="flex justify-center items-center mb-12">
                <Text className="text-lg text-blue-200 text-center leading-6 max-w-xs">
                    {description}
                </Text>
            </View>
        </View>
    )
}

export default TitleAndDescription;