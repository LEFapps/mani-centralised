import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button } from 'react-native'

import Card from '../../shared/card'
import { globalStyles } from '../../styles/global'

const Screen = ({ navigation, route }) => {
  const { maniClient } = global

  const [parameters, setParameters] = useState()
  const [errorText, setError] = useState('')

  useEffect(() => {
    getParameters()
  }, [])

  const getParameters = () => {
    setError('')
    maniClient.system
      .parameters()
      .then(data => setParameters(data))
      .catch(e => setError(e.message || e))
  }

  return (
    <View style={globalStyles.main}>
      {!!errorText && (
        <View style={globalStyles.paragraph}>
          <Text style={globalStyles.errorText}>{errorText}</Text>
        </View>
      )}
      {parameters && (
        <FlatList
          data={['income', 'demurrage']}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            const data = parameters[item]
            return (
              <View>
                <Card>
                  <Text style={globalStyles.property}>{item}</Text>
                  <Text style={globalStyles.price}>
                    {item === 'income' && data.format()}
                    {item === 'demurrage' && `${data} %`}
                  </Text>
                </Card>
              </View>
            )
          }}
        />
      )}
    </View>
  )
}

export default Screen
