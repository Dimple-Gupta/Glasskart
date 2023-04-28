import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import { getData,postDataAndImage,postData } from "../FetchNodeServices";
import { isEmpty,errorMessage } from "../Checks";
import {DropzoneArea} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding:20
    },
    subdiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      height: 'auto',
      marginTop:10,
      background:'inherit',
      padding:15,
      borderRadius:5,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
  }));

  export default function ProductPictures(props){
    const classes = useStyles();
    const [productId,setProductId] = useState("")
    const [productList,setProductList] = useState([]);
    const [finalProductId,setFinalProductId] = useState("")
    const [finalProductListColor,setFinalProductListColor] = useState([]);
    const [finalProductListSize,setFinalProductListSize] = useState([]);
    const [size,setSize] = useState("")
    
    const fetchAllProducts = async()=>{
      var list = await getData('finalproduct/fetchallproducts')
      setProductList(list.data)
    }
    const fetchAllFinalProductColor = async(psize)=>{
      var body={productid:productId,size:psize}
      var list = await postData('finalproduct/fetchsizebyproductid',body)
      setFinalProductListColor(list.data)
    }
    const fetchAllFinalProductSize = async()=>{
      var body={productid:productId}
      var list = await postData('finalproduct/fetchsizebyproductid',body)
      setFinalProductListSize(list.data)
    }
    const fillProducts=()=>{
      return productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
      })
    }
    const fillProductSize=()=>{
      return finalProductListSize.map((item)=>{
        return <MenuItem value={item.size}>{item.size}</MenuItem>
      })
    }
    
    const fillFinalProductColor=()=>{
      return finalProductListColor.map((item)=>{
        return <MenuItem value={item.finalproductid}>{item.colorname}</MenuItem>
      })
    }
    const handleChange=(event)=>{
      setProductId(event.target.value)
        fetchAllFinalProductSize(event.target.value)
    }
    const handleChangeColor=(event)=>{
      setSize(event.target.value)
      var body={productid:productId,size:event.target.value}
        fetchAllFinalProductColor(event.target.value)
    }
    useEffect(function(){
      fetchAllProducts()
    },[])
    const handleFiles=(files)=>{



    }
    return(
      <div className={classes.root}>
      <div className={classes.subdiv}>
     <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
       <Grid item xs={12}><div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',fontSize:20,fontWeight:"bold",letterSpacing:1}}>
        <span><img src="./glasskart.png" alt="Remy Sharp" style={{width:50}}></img></span><span> Add Final Products</span>
       </div></Grid>
      
      <Grid item xs={4}>
      <FormControl variant="outlined" fullWidth>
      <InputLabel id="product-id">Select Product</InputLabel>
      <Select
        labelId="product-id"
        id="productid"
        onChange={(event)=>handleChange(event)}
        label="Select Product"
      >
        {fillProducts()}
      </Select>
    </FormControl>
      </Grid>
      <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="size-id">Select Size</InputLabel>
            <Select
              labelId="size-id"
              id="sizeid"
              onChange={(event)=>handleChangeColor(event)}
              label="Select Size"
            >
             <MenuItem value="">Select Size</MenuItem>
             {fillFinalProductColor()}
             
            </Select>
          </FormControl>
            </Grid>

      <Grid item xs={4}>
      <FormControl variant="outlined" fullWidth>
      <InputLabel id="finalproduct-id">Select Final Product</InputLabel>
      <Select
        labelId="finalproduct-id"
        id="finalproductid"
        onChange={(event)=>setFinalProductId(event.target.value)}
        label="Select Final Product"
      >
          <MenuItem value="">Select Color</MenuItem>
        {fillFinalProductColor()}
      </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <DropzoneArea
      acceptedFiles={["image/jpeg","image/png","image/bmp"]}
      maxFileSize={5000000}
      fileLimit={10}
      onChange={(files)=>handleChange(files)}
        />
      </Grid>
      </Grid>
      </div></div>
    )
  }