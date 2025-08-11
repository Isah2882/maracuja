import { StyleSheet, View, Text, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useTasks } from '../contexts/TaskContext';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Picker } from '@react-native-picker/picker';

const validationSchema=Yup.object().shape({
  title: Yup.string()
  .max(50, 'O título deve ter no máximo 50 caracteres')
  .required('O título é obrigatório'),
  description: Yuo.string().max(200, 'A descrição deve ter no máximo 200 caracteres'),
  priority: Yup.string().required('Selecione uma prioridade'),
});

export default function AddTaskScreen({ navigation }) {
  const { addTask,theme } = useTasks();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, {resetForm}) => {
    if (acceptTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos para adicionar uma tarefa.');
      return;
    }
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          title: values.title,
          completed: false,
        });
        addTask({ 
          title: values.title,
          description: values.description,
          priority:values.priority, });
          setSuccessMessage('Tarefas adicionada com sucesso');
          setTimeout(()=>{
            setSuccessMessage(''); /*You, 1 second ago uncomitted changes*/
            resetForm();
            setAcceptTerms(false);
        navigation.goBack();
      }, 1000);
      } catch (err) {
        Alert.alert('Erro', 'Falha ao salvar na API');
      }
    };

  return (
    <View style={[styles.container, theme==='dark' && styles.darkContainer]}>
     <Text style={[StyleSheet.container, theme==='dark' && styles.darkText]}>Nova tarefa</Text>
      {successMessage? <Text style={styles.successText}>{successMessage}</Text>: null}
      <Formik 
      initialValues={{title:'', description:'',priority:'baixa'}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({})}
      </Formik>
      <CustomInput
        value={title}
        onChangeText={(text) => setTitle(text.slice(0, 50))}
        placeholder="Digite o título da tarefa (máx. 50 caracteres)"
      />
      <CustomInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição (opcional)"
        multiline
      />
      <CustomButton title="Salvar Tarefa" onPress={handleSubmit} color="#007bff" />
      <CustomButton
        title="Cancelar"
        onPress={() => navigation.goBack()}
        color="#dc3545"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});