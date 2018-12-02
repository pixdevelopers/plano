import express from 'express';
const router = express.Router();
import Client from '../models/client';
import _ from 'lodash';
import ServiceType from '../models/serviceType';

router.get('/:code', async (req, res, next) => {
    const client = await Client.findOne({ code: req.params.code }).select(
        'name email avatar description profile.mobile profile.isParkingAvailble profile.address profile.location profile.webSite profile.qrCode profile.description'
    );
    if (!client)
        return res.status(404).send('The client with the given ID was not found.');
    const services = await ServiceType.find({ client: req.params.id }).select(
        'name price duration description'
    );
    //TODO add rating to each service
    // for(const item of services){
    //   const rate = await Service.find({
    //     serviceType: item._id
    //   }).select('rating.rank');
    // }
    res.send({ client, services });
});


export default router;
