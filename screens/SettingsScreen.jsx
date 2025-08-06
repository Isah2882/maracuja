import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import CustomButton from '../components/CustomButton'
import CustomModal from '../components/CustomModal'
import { useTasks } from "../contexts/TaskContext";

export default function SettingScreen(){
    const {toggleTheme, theme, clearTsak, exportTask, restoreTask}=useTasks();
    const [modalVisible, setModalVisible]=useState(false);
    const[successMessage, setSuccessMessage]=useState('');

    const handleClearTask=async()=>{
        try{
            await clearTsak();
            setModalVisible(false);
            setSuccessMessage('Tarefas limpas com sucesso');
            setTimeout(()=>setSuccessMessage(''));
            } catch(err){
                setModalVisible(false);
                setSuccessMessage('');
                alert('Erro ao limpar tarefas');
            }
    }


    const handleExport=async()=>{
         try{
            const message=await exportTask();
            setSuccessMessage(message);
            setTimeout(()=>setSuccessMessage(''),2000);
        }catch (err){
            setSuccessMessage('');
            alert(err.message);
         }
    };
    const handleRestore=async()=>{
        try{
            const message=await exportTask();
            setSuccessMessage(message);
            setTimeout(()=>setSuccessMessage(''),2000);
        }catch (err){
            setSuccessMessage('');
            alert(err.message);
        }
    };

    return(
        <View style={[StyleSheet.container, theme==='dark' && styles.darkContainer]}>
            <Text style={[StyleSheet.container, theme==='dark' && styles.darkText]}>Configurações</Text>
            {successMessage? <Text style={styles.successText}>{successMessage}</Text>: null}
            <CustomButton
              title={`Mudar para Tema${theme==='light'? 'Escuro': 'Claro'}`}
              onPress={toggleTheme}
              color="#007bff"
            />
            <CustomButton
              title="Limpar Todas as Limpar"
              onPress={()=> setModalVisible(true)}
              color="#dc3545"
            />
             <CustomButton
              title="Exportar Tarefas"
              onPress={handleExport}
              color="#17a2b8"
            />
             <CustomButton
              title="Restaurar Backup"
              onPress={handleRestore}
              color="#17a2b8"
            />
            <CustomModal
              visible={modalVisible}
              onClose={()=>setModalVisible(false)}
              title="Limpar Limpar"
              message="Deseja Excluir Todas as Tarefas Locais?"
              onConfirm={handleClearTask}
            />
        </View>
    );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    darkContainer:{
        backgroundColor:'#333',
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
        color:'#333',
    },
    successText:{
        fontSize:16,
        color:'328a745',
        textAlign:'center',
        marginBottom:10,
    },
    darkText:{
        color:'#fff',
    },
});