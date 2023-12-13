const DB = require('../database/index');
const tabela = 'brands';

async function listar(){
    return await DB.execute(`SELECT * FROM ${tabela};`);
}

async function listarUM(id){
    return await DB.execute(`SELECT * FROM ${tabela} WHERE brand_id = ${id};`);
}

async function criar(data){
    try{
        const linha = await DB.execute(`INSERT INTO ${tabela} (brand_name) VALUES ('${data.brand_name}');`);
        return listarUM(linha.insertId);
    } catch(error){
        return{
            type: 'error',
            message: `Erro ao inserir dados: ${error.message}`
        }
    }
};

async function editar(id, data){
    try{
        if(!data.brand_name){
            throw new Error('brand_name é um parametro obrigatório!');
        }
        if(data.brand_status){
            const linha = await DB.execute(`UPDATE ${tabela} SET brand_name = '${data.brand_name}', brand_status = ${data.brand_status} WHERE brand_id = ${id};`);
        } else{
            const linha = await DB.execute(`UPDATE ${tabela} SET brand_name = '${data.brand_name}' WHERE brand_id = ${id};`);
        }
        return listarUM(id);
    } catch (error){
        return{
            type: 'error',
            message: `${error}`
        }
    }
}

async function deletar(id){
    try{
        if(!id){
            throw new Error('brand_id é obrigatório');
        }
        await DB.execute(`DELETE FROM ${tabela} WHERE brand_id = ${id}`);
        return {
            type: 'error',
            message: 'Dados apagados com sucesso!'
        }
    } catch (error){
        return{
            type: 'error',
            message: `Deu ruim: ${error}`
        }
    }
}

module.exports = {
    listar,
    listarUM,
    criar,
    editar,
    deletar
}