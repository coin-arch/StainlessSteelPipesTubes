
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../../.env.local');
const envConfig = require('dotenv').parse(fs.readFileSync(envPath));

const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const GRID_HTML = `
<div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInLeft" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-seamless-pipe-manufacturer"><img src="/images/our-work/products/stainless-steel/stainless-steel-seamless-pipe.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-seamless-pipe-manufacturer">SS Seamless Pipe</a></h4>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInDown" data-wow-duration="2s" data-wow-delay="0.6s">
        <div class="dlab-box service-box-3"> 
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-polished-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-polished-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-polished-pipe-exporter">SS Polished Pipe</a></h4>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInRight" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-square-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-square-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-square-pipe-exporter">SS Square Pipe</a></h4>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInLeft" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-round-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-round-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-round-pipe-exporter">SS Round Pipe</a></h4>
            </div>
        </div>
    </div>
     <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.6s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-rectangular-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-rectangular-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-rectangular-pipe-exporter">SS Rectangular Pipe</a></h4>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInRight" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-oval-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-oval-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-oval-pipe-exporter">SS Oval Pipe</a></h4>
            </div>
        </div>
    </div>
        <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInRight" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-hydraulic-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-hydraulic-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-hydraulic-pipe-exporter">SS Hydraulic Pipe</a></h4>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 m-b50 wow fadeInRight" data-wow-duration="2s" data-wow-delay="0.3s">
        <div class="dlab-box service-box-3">
            <div class="dlab-media radius-sm dlab-img-overlay1 zoom dlab-img-effect"> 
                <a href="/products/stainless-steel-hollow-pipe-exporter"><img src="/images/our-work/products/stainless-steel/stainless-steel-hollow-pipes.jpg" alt=""></a> 
            </div>
            <div class="dlab-info">
                <h4 class="title"><a href="/products/stainless-steel-hollow-pipe-exporter">SS Hollow Pipe</a></h4>
            </div>
        </div>
    </div>
</div>
`;

async function updateContent() {
    const slug = 'stainless-steel-pipe-manufacturer';
    const company_id = envConfig.NEXT_PUBLIC_COMPANY_ID;

    console.log(`Updating content for: ${slug} (Company: ${company_id})`);

    const { error } = await supabase
        .from('post')
        .update({ content: GRID_HTML })
        .eq('slug', slug)
        .eq('company_id', company_id);

    if (error) console.error("Error updating content:", error);
    else console.log("SUCCESS: Content updated with grid HTML.");
}

updateContent();
