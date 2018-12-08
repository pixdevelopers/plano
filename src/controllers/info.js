import Client from '../models/client';
import _ from 'lodash';
import ServiceType from '../models/serviceType';

module.exports = {

    getByCode: async (req, res, next) => {
        const client = await Client.findOne({
            code: req.params.code
        }).select('name email avatar description isLocked profile.mobile profile.isParkingAvailble profile.address profile.location profile.webSite profile.qrCode profile.description');

        if (!client)
            return res.status(404).send('The profile with the given code was not found.');
        if (client.isLocked)
            return res.status(401).send('The profile with the given code was deactived.');
        delete client.isLocked;
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
    },

    getByQr: async (req, res, next) => {
        const client = await Client.findOne({
            'profile.qrCode': req.params.code
        }).select('name email avatar description isLocked profile.mobile profile.isParkingAvailble profile.address profile.location profile.webSite profile.qrCode profile.description');

        if (!client)
            return res.status(404).send('The profile with the given code was not found.');
        if (client.isLocked)
            return res.status(401).send('The profile with the given code was deactived.');
        delete client.isLocked;
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
    },

    
};
