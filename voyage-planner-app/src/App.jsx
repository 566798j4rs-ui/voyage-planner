import React, { useMemo, useState } from "react";

const PORTS = ["Aburatsu", "Amami", "BH", "Bali Benoa", "Bali North**", "Belitung**", "Beppu", "Bintan**", "Boracay**", "Busan", "Cam Rahn", "Con Son**", "Coron Bay", "Country", "Currimao**", "Da Nang (Chan May)", "Da Nang (Tien Sa)", "Dalian", "Fukuoka", "Ha Long Bay", "Haikou", "Hainan Straits E", "Hainan Straits W", "Ho Chi Minh (Dong Nai)", "Ho Chi Minh* (HCMC)", "Ho Chi Minh* (Phu My)", "Hong Kong", "Hualien", "Incheon", "Ishigaki", "Jakarta", "Jeju Port North", "Jeju Seogwipo", "Kagoshima", "Kaohsiung", "Keelung", "Ko Samui**", "Kochi", "Krabi**", "Kumamoto", "Kyoto", "Kyoto Maizuru", "Laem Chabang", "Langkawi", "Lombok", "Manila", "Medan", "Melaka**", "Miyakojima", "Motobu", "Nagagusuku", "Nagasaki", "Naha", "Nansha", "Nha Trang (Ana Marina)**", "Nha Trang N**", "Nha Trang S**", "OMA", "Osaka", "Pangkor**", "Penang", "Penghu", "Phu Qoc", "Phu Quoc", "Phuket DSP", "Phuket Patong**", "Port Dickson**", "Port Klang CT (South)", "Port Klang WP", "Port of Embarkation", "Puerto Princesa", "Pulau Bangka**", "QAT", "Qingdao", "Redang**", "Salomague**", "Sanya", "Sasebo", "Shanghai", "Shenzhen", "Shimizu", "Sihanoukville", "Singapore MBCC", "Singapore SCC", "Subic Bay", "Surabaya", "TWN", "Taichung", "Tianjin", "Tioman**", "UAE", "Wakayama", "Xiamen", "Yokohama", "Yonaguni", "Highsea"];
const DISTANCE_PAIRS = [["Keelung", "Kaohsiung", 240], ["Keelung", "Penghu", 233], ["Keelung", "Hualien", 111], ["Keelung", "Taichung", 138], ["Keelung", "Aburatsu", 654], ["Keelung", "Amami", 473], ["Keelung", "Naha", 340], ["Keelung", "Miyakojima", 205], ["Keelung", "Ishigaki", 155], ["Keelung", "Osaka", 931], ["Keelung", "Fukuoka", 707], ["Keelung", "Nagasaki", 633], ["Keelung", "Kagoshima", 635], ["Keelung", "Kumamoto", 649], ["Keelung", "Kochi", 817], ["Keelung", "Nagagusuku", 365], ["Keelung", "Kyoto", 1004], ["Keelung", "Beppu", 794], ["Keelung", "Sasebo", 655], ["Keelung", "Motobu", 359], ["Keelung", "Wakayama", 905], ["Keelung", "Yonaguni", 86], ["Keelung", "Busan", 721], ["Keelung", "Jeju Seogwipo", 548], ["Keelung", "Jeju Port North", 578], ["Keelung", "Hong Kong", 485], ["Keelung", "Xiamen", 242], ["Keelung", "Shanghai", 456], ["Keelung", "Qingdao", 729], ["Keelung", "Dalian", 873], ["Keelung", "Tianjin", 1021], ["Keelung", "Shenzhen", 524], ["Keelung", "Haikou", 742], ["Keelung", "Sanya", 844], ["Keelung", "Da Nang (Tien Sa)", 986], ["Keelung", "Da Nang (Chan May)", 980], ["Keelung", "Nha Trang N**", 1096], ["Keelung", "Nha Trang S**", 1125], ["Keelung", "Ho Chi Minh* (Phu My)", 1320], ["Keelung", "Ha Long Bay", 936], ["Keelung", "Manila", 767], ["Keelung", "Boracay**", 945], ["Keelung", "Subic Bay", 740], ["Keelung", "Puerto Princesa", 1078], ["Keelung", "Salomague**", 512], ["Keelung", "Coron Bay", 915], ["Keelung", "Currimao**", 498], ["Keelung", "Singapore SCC", 1855], ["Keelung", "Singapore MBCC", 1850], ["Kaohsiung", "Keelung", 240], ["Kaohsiung", "Penghu", 103], ["Kaohsiung", "Hualien", 270], ["Kaohsiung", "Taichung", 202], ["Kaohsiung", "Naha", 582], ["Kaohsiung", "Miyakojima", 434], ["Kaohsiung", "Ishigaki", 380], ["Kaohsiung", "Osaka", 1144], ["Kaohsiung", "Fukuoka", 915], ["Kaohsiung", "Nagasaki", 842], ["Kaohsiung", "Kagoshima", 837], ["Kaohsiung", "Nagagusuku", 578], ["Kaohsiung", "Kyoto", 1208], ["Kaohsiung", "Beppu", 1021], ["Kaohsiung", "Motobu", 600], ["Kaohsiung", "Busan", 925], ["Kaohsiung", "Hong Kong", 352], ["Kaohsiung", "Xiamen", 191], ["Kaohsiung", "Shanghai", 647], ["Kaohsiung", "Qingdao", 920], ["Kaohsiung", "Dalian", 1061], ["Kaohsiung", "Tianjin", 1210], ["Kaohsiung", "Shenzhen", 386], ["Kaohsiung", "Haikou", 605], ["Kaohsiung", "Hainan Straits E", 550], ["Kaohsiung", "Sanya", 685], ["Kaohsiung", "Da Nang (Tien Sa)", 792], ["Kaohsiung", "Da Nang (Chan May)", 795], ["Kaohsiung", "Nha Trang N**", 896], ["Kaohsiung", "Ho Chi Minh* (Phu My)", 1120], ["Kaohsiung", "Ha Long Bay", 780], ["Kaohsiung", "Manila", 562], ["Kaohsiung", "Boracay**", 719], ["Kaohsiung", "Subic Bay", 520], ["Kaohsiung", "Puerto Princesa", 865], ["Kaohsiung", "Salomague**", 300], ["Kaohsiung", "Coron Bay", 673], ["Kaohsiung", "Currimao**", 290], ["Penghu", "Keelung", 231.5], ["Penghu", "Kaohsiung", 102], ["Penghu", "Taichung", 98], ["Penghu", "Naha", 527], ["Penghu", "Miyakojima", 396], ["Penghu", "Ishigaki", 344], ["Penghu", "Osaka", 1113], ["Penghu", "Fukuoka", 877], ["Penghu", "Nagasaki", 804], ["Penghu", "Kagoshima", 799], ["Penghu", "Nagagusuku", 557], ["Penghu", "Kyoto", 1170], ["Penghu", "Beppu", 985], ["Penghu", "Motobu", 705], ["Penghu", "Busan", 884], ["Penghu", "Hong Kong", 320.64], ["Penghu", "Xiamen", 114], ["Penghu", "Shanghai", 609], ["Penghu", "Qingdao", 883], ["Penghu", "Dalian", 1024], ["Penghu", "Tianjin", 1173], ["Penghu", "Shenzhen", 364], ["Penghu", "Haikou", 615], ["Penghu", "Sanya", 710], ["Penghu", "Da Nang (Tien Sa)", 810], ["Penghu", "Nha Trang N**", 917], ["Penghu", "Ho Chi Minh* (Phu My)", 1146], ["Penghu", "Ha Long Bay", 807], ["Penghu", "Manila", 617], ["Penghu", "Boracay**", 795], ["Penghu", "Subic Bay", 590], ["Hualien", "Keelung", 118], ["Hualien", "Kaohsiung", 270], ["Hualien", "Hong Kong", 574], ["Taichung", "Keelung", 134], ["Taichung", "Kaohsiung", 201], ["Taichung", "Penghu", 98], ["Taichung", "Hong Kong", 389], ["Aburatsu", "Keelung", 654], ["Aburatsu", "Nagasaki", 220], ["Aburatsu", "Kagoshima", 110], ["Aburatsu", "Kumamoto", 230], ["Aburatsu", "Beppu", 145], ["Aburatsu", "Sasebo", 248], ["Amami", "Keelung", 473], ["Amami", "Nagasaki", 280], ["Amami", "Kagoshima", 230], ["Amami", "Kumamoto", 295], ["Amami", "Sasebo", 303], ["Naha", "Keelung", 336], ["Naha", "Kaohsiung", 582], ["Naha", "Penghu", 527], ["Naha", "Miyakojima", 174], ["Naha", "Ishigaki", 241], ["Naha", "Osaka", 664], ["Naha", "Fukuoka", 530], ["Naha", "Nagasaki", 420], ["Naha", "Kagoshima", 376], ["Naha", "Kumamoto", 436], ["Naha", "Kochi", 568], ["Naha", "Nagagusuku", 54], ["Naha", "Kyoto", 824], ["Naha", "Beppu", 537], ["Naha", "Sasebo", 437], ["Naha", "Motobu", 35], ["Naha", "Busan", 549], ["Naha", "Hong Kong", 822], ["Naha", "Xiamen", 560], ["Naha", "Shanghai", 471], ["Naha", "Qingdao", 719], ["Naha", "Dalian", 843], ["Naha", "Tianjin", 991], ["Naha", "Shenzhen", 843], ["Naha", "Haikou", 1085], ["Naha", "Sanya", 1162], ["Naha", "Nansha", 873], ["Naha", "Da Nang (Tien Sa)", 1262], ["Naha", "Nha Trang N**", 1345], ["Naha", "Ho Chi Minh* (Phu My)", 1567], ["Naha", "Ha Long Bay", 1277], ["Naha", "Manila", 935], ["Miyakojima", "Keelung", 204], ["Miyakojima", "Kaohsiung", 434], ["Miyakojima", "Penghu", 396], ["Miyakojima", "Naha", 174], ["Miyakojima", "Ishigaki", 97], ["Miyakojima", "Osaka", 811], ["Miyakojima", "Fukuoka", 641], ["Miyakojima", "Nagasaki", 547], ["Miyakojima", "Kagoshima", 511], ["Miyakojima", "Kumamoto", 565], ["Miyakojima", "Nagagusuku", 202], ["Miyakojima", "Kyoto", 916], ["Miyakojima", "Beppu", 684], ["Miyakojima", "Sasebo", 573], ["Miyakojima", "Motobu", 200], ["Miyakojima", "Busan", 659], ["Miyakojima", "Hong Kong", 699], ["Miyakojima", "Xiamen", 456], ["Miyakojima", "Shanghai", 483], ["Miyakojima", "Qingdao", 753], ["Miyakojima", "Dalian", 893], ["Miyakojima", "Tianjin", 1041], ["Miyakojima", "Shenzhen", 711], ["Miyakojima", "Haikou", 932], ["Miyakojima", "Sanya", 1010], ["Miyakojima", "Nansha", 740], ["Miyakojima", "Da Nang (Tien Sa)", 1110], ["Miyakojima", "Nha Trang N**", 1194], ["Miyakojima", "Ho Chi Minh* (Phu My)", 1419], ["Miyakojima", "Ha Long Bay", 1125], ["Miyakojima", "Manila", 790], ["Ishigaki", "Keelung", 151], ["Ishigaki", "Kaohsiung", 380], ["Ishigaki", "Penghu", 344], ["Ishigaki", "Naha", 241], ["Ishigaki", "Miyakojima", 91], ["Ishigaki", "Osaka", 874], ["Ishigaki", "Fukuoka", 696], ["Ishigaki", "Nagasaki", 601], ["Ishigaki", "Kagoshima", 571], ["Ishigaki", "Kumamoto", 622], ["Ishigaki", "Nagagusuku", 265], ["Ishigaki", "Kyoto", 986], ["Ishigaki", "Beppu", 746], ["Ishigaki", "Sasebo", 625], ["Ishigaki", "Motobu", 265], ["Ishigaki", "Busan", 711], ["Ishigaki", "Hong Kong", 658], ["Ishigaki", "Xiamen", 378], ["Ishigaki", "Shanghai", 500], ["Ishigaki", "Qingdao", 772], ["Ishigaki", "Dalian", 916], ["Ishigaki", "Tianjin", 1064], ["Ishigaki", "Shenzhen", 660], ["Ishigaki", "Haikou", 876], ["Ishigaki", "Sanya", 954], ["Ishigaki", "Da Nang (Tien Sa)", 1062], ["Ishigaki", "Nha Trang N**", 1138], ["Ishigaki", "Ho Chi Minh* (Phu My)", 1365], ["Ishigaki", "Ha Long Bay", 1070], ["Ishigaki", "Manila", 745], ["Osaka", "Keelung", 931], ["Osaka", "Kaohsiung", 1144], ["Osaka", "Penghu", 1113], ["Osaka", "Naha", 664], ["Osaka", "Miyakojima", 811], ["Osaka", "Ishigaki", 874], ["Osaka", "Fukuoka", 393], ["Osaka", "Nagasaki", 488], ["Osaka", "Kagoshima", 387], ["Osaka", "Kochi", 156], ["Osaka", "Nagagusuku", 655], ["Osaka", "Kyoto", 630], ["Osaka", "Beppu", 289], ["Osaka", "Shimizu", 310], ["Osaka", "Yokohama", 366], ["Osaka", "Busan", 452], ["Osaka", "Hong Kong", 1387], ["Osaka", "Xiamen", 1141], ["Osaka", "Shanghai", 828], ["Osaka", "Qingdao", 957], ["Osaka", "Dalian", 1039], ["Osaka", "Tianjin", 1188], ["Osaka", "Shenzhen", 1426], ["Osaka", "Haikou", 1643], ["Osaka", "Sanya", 1745], ["Fukuoka", "Keelung", 707], ["Fukuoka", "Kaohsiung", 915], ["Fukuoka", "Penghu", 877], ["Fukuoka", "Naha", 530], ["Fukuoka", "Miyakojima", 641], ["Fukuoka", "Ishigaki", 696], ["Fukuoka", "Osaka", 393], ["Fukuoka", "Nagasaki", 126], ["Fukuoka", "Kagoshima", 268], ["Fukuoka", "Nagagusuku", 544], ["Fukuoka", "Kyoto", 331], ["Fukuoka", "Beppu", 156], ["Fukuoka", "Sasebo", 110], ["Fukuoka", "Busan", 121], ["Fukuoka", "Hong Kong", 1149], ["Fukuoka", "Xiamen", 902], ["Fukuoka", "Shanghai", 503], ["Fukuoka", "Qingdao", 546], ["Fukuoka", "Dalian", 622], ["Fukuoka", "Tianjin", 771], ["Fukuoka", "Shenzhen", 1187], ["Fukuoka", "Haikou", 1403], ["Fukuoka", "Sanya", 1506], ["Nagasaki", "Keelung", 633], ["Nagasaki", "Kaohsiung", 842], ["Nagasaki", "Penghu", 804], ["Nagasaki", "Aburatsu", 220], ["Nagasaki", "Amami", 280], ["Nagasaki", "Naha", 420], ["Nagasaki", "Miyakojima", 547], ["Nagasaki", "Ishigaki", 601], ["Nagasaki", "Osaka", 488], ["Nagasaki", "Fukuoka", 126], ["Nagasaki", "Kagoshima", 172], ["Nagasaki", "Nagagusuku", 428], ["Nagasaki", "Kyoto", 421], ["Nagasaki", "Beppu", 249], ["Nagasaki", "Sasebo", 50], ["Nagasaki", "Motobu", 405], ["Nagasaki", "Wakayama", 470], ["Nagasaki", "Busan", 169], ["Nagasaki", "Jeju Seogwipo", 188], ["Nagasaki", "Hong Kong", 1079], ["Nagasaki", "Xiamen", 831], ["Nagasaki", "Shanghai", 458], ["Nagasaki", "Qingdao", 548], ["Nagasaki", "Dalian", 630], ["Nagasaki", "Tianjin", 779], ["Nagasaki", "Shenzhen", 1117], ["Nagasaki", "Haikou", 1334], ["Nagasaki", "Sanya", 1437], ["Kagoshima", "Keelung", 624], ["Kagoshima", "Kaohsiung", 837], ["Kagoshima", "Penghu", 799], ["Kagoshima", "Aburatsu", 110], ["Kagoshima", "Amami", 230], ["Kagoshima", "Naha", 376], ["Kagoshima", "Miyakojima", 511], ["Kagoshima", "Ishigaki", 571], ["Kagoshima", "Osaka", 387], ["Kagoshima", "Fukuoka", 268], ["Kagoshima", "Nagasaki", 172], ["Kagoshima", "Kumamoto", 180], ["Kagoshima", "Nagagusuku", 368], ["Kagoshima", "Kyoto", 563], ["Kagoshima", "Beppu", 264], ["Kagoshima", "Shimizu", 525], ["Kagoshima", "Motobu", 365], ["Kagoshima", "Wakayama", 362], ["Kagoshima", "Busan", 311], ["Kagoshima", "Jeju Port North", 293], ["Kagoshima", "Hong Kong", 1080], ["Kagoshima", "Xiamen", 832], ["Kagoshima", "Shanghai", 512], ["Kagoshima", "Qingdao", 639], ["Kagoshima", "Dalian", 721], ["Kagoshima", "Tianjin", 870], ["Kagoshima", "Shenzhen", 1118], ["Kagoshima", "Haikou", 1335], ["Kagoshima", "Sanya", 1437], ["Kumamoto", "Keelung", 660], ["Kumamoto", "Aburatsu", 230], ["Kumamoto", "Amami", 295], ["Kumamoto", "Naha", 436], ["Kumamoto", "Miyakojima", 565], ["Kumamoto", "Ishigaki", 622], ["Kumamoto", "Nagasaki", 115], ["Kumamoto", "Kagoshima", 180], ["Kumamoto", "Sasebo", 125], ["Kumamoto", "Motobu", 415], ["Kumamoto", "Wakayama", 478], ["Kumamoto", "Busan", 289], ["Kochi", "Keelung", 817], ["Kochi", "Naha", 568], ["Kochi", "Osaka", 156], ["Kochi", "Nagasaki", 373], ["Kochi", "Kagoshima", 266], ["Kochi", "Sasebo", 398], ["Kochi", "Shimizu", 320], ["Kochi", "Wakayama", 125], ["Kochi", "Yokohama", 375], ["Nagagusuku", "Keelung", 365], ["Nagagusuku", "Kaohsiung", 591], ["Nagagusuku", "Penghu", 557], ["Nagagusuku", "Naha", 54], ["Nagagusuku", "Miyakojima", 202], ["Nagagusuku", "Ishigaki", 265], ["Nagagusuku", "Osaka", 655], ["Nagagusuku", "Fukuoka", 544], ["Nagagusuku", "Nagasaki", 428], ["Nagagusuku", "Kagoshima", 368], ["Nagagusuku", "Kyoto", 838], ["Nagagusuku", "Beppu", 533], ["Nagagusuku", "Busan", 565], ["Nagagusuku", "Hong Kong", 832], ["Nagagusuku", "Xiamen", 590], ["Nagagusuku", "Shanghai", 525], ["Nagagusuku", "Qingdao", 759], ["Nagagusuku", "Dalian", 875], ["Nagagusuku", "Tianjin", 1023], ["Nagagusuku", "Shenzhen", 874], ["Nagagusuku", "Haikou", 1106], ["Nagagusuku", "Sanya", 1183], ["Nagagusuku", "Da Nang (Tien Sa)", 1287], ["Nagagusuku", "Nha Trang N**", 1366], ["Nagagusuku", "Ho Chi Minh* (Phu My)", 1589], ["Nagagusuku", "Ha Long Bay", 1299], ["Nagagusuku", "Manila", 954], ["Kyoto Maizuru", "Keelung", 1004], ["Kyoto Maizuru", "Kaohsiung", 1208], ["Kyoto Maizuru", "Penghu", 1170], ["Kyoto Maizuru", "Naha", 824], ["Kyoto Maizuru", "Miyakojima", 916], ["Kyoto Maizuru", "Ishigaki", 986], ["Kyoto Maizuru", "Osaka", 630], ["Kyoto Maizuru", "Fukuoka", 331], ["Kyoto Maizuru", "Nagasaki", 421], ["Kyoto Maizuru", "Kagoshima", 563], ["Kyoto Maizuru", "Nagagusuku", 838], ["Kyoto Maizuru", "Beppu", 393], ["Kyoto Maizuru", "Busan", 335], ["Kyoto Maizuru", "Hong Kong", 1441], ["Kyoto Maizuru", "Xiamen", 1196], ["Kyoto Maizuru", "Shanghai", 793], ["Kyoto Maizuru", "Qingdao", 826], ["Kyoto Maizuru", "Dalian", 903], ["Kyoto Maizuru", "Tianjin", 1051], ["Kyoto Maizuru", "Shenzhen", 1479], ["Kyoto Maizuru", "Haikou", 1696], ["Kyoto Maizuru", "Sanya", 1799], ["Beppu", "Keelung", 794], ["Beppu", "Kaohsiung", 1021], ["Beppu", "Penghu", 985], ["Beppu", "Aburatsu", 145], ["Beppu", "Naha", 537], ["Beppu", "Miyakojima", 684], ["Beppu", "Ishigaki", 746], ["Beppu", "Osaka", 289], ["Beppu", "Fukuoka", 156], ["Beppu", "Nagasaki", 249], ["Beppu", "Kagoshima", 264], ["Beppu", "Nagagusuku", 533], ["Beppu", "Kyoto", 393], ["Beppu", "Busan", 212], ["Beppu", "Hong Kong", 1262], ["Beppu", "Xiamen", 1017], ["Beppu", "Shanghai", 695], ["Beppu", "Qingdao", 656], ["Beppu", "Dalian", 731], ["Beppu", "Tianjin", 880], ["Beppu", "Shenzhen", 1300], ["Beppu", "Haikou", 1517], ["Beppu", "Sanya", 1621], ["Sasebo", "Keelung", 655], ["Sasebo", "Aburatsu", 248], ["Sasebo", "Amami", 303], ["Sasebo", "Naha", 437], ["Sasebo", "Miyakojima", 573], ["Sasebo", "Ishigaki", 625], ["Sasebo", "Fukuoka", 110], ["Sasebo", "Nagasaki", 50], ["Sasebo", "Kagoshima", 204], ["Sasebo", "Kumamoto", 125], ["Sasebo", "Motobu", 425], ["Sasebo", "Wakayama", 495], ["Sasebo", "Jeju Port North", 172], ["Shimizu", "Osaka", 310], ["Shimizu", "Kagoshima", 525], ["Shimizu", "Kochi", 320], ["Shimizu", "Wakayama", 275], ["Shimizu", "Yokohama", 125], ["Motobu", "Keelung", 362], ["Motobu", "Kaohsiung", 600], ["Motobu", "Penghu", 705], ["Motobu", "Naha", 35], ["Motobu", "Miyakojima", 200], ["Motobu", "Ishigaki", 265], ["Motobu", "Nagasaki", 405], ["Motobu", "Kagoshima", 365], ["Motobu", "Kumamoto", 415], ["Motobu", "Sasebo", 425], ["Wakayama", "Keelung", 905], ["Wakayama", "Nagasaki", 470], ["Wakayama", "Kagoshima", 362], ["Wakayama", "Kumamoto", 478], ["Wakayama", "Kochi", 125], ["Wakayama", "Sasebo", 495], ["Wakayama", "Shimizu", 275], ["Wakayama", "Yokohama", 340], ["Yokohama", "Osaka", 366], ["Yokohama", "Kochi", 375], ["Yokohama", "Shimizu", 125], ["Yokohama", "Wakayama", 340], ["Yonaguni", "Keelung", 86], ["Busan", "Keelung", 721], ["Busan", "Kaohsiung", 925], ["Busan", "Penghu", 884], ["Busan", "Naha", 549], ["Busan", "Miyakojima", 659], ["Busan", "Ishigaki", 711], ["Busan", "Osaka", 452], ["Busan", "Fukuoka", 121], ["Busan", "Nagasaki", 169], ["Busan", "Kagoshima", 311], ["Busan", "Kumamoto", 289], ["Busan", "Nagagusuku", 565], ["Busan", "Kyoto", 335], ["Busan", "Beppu", 212], ["Busan", "Jeju Seogwipo", 175], ["Busan", "Hong Kong", 1156], ["Busan", "Xiamen", 910], ["Busan", "Shanghai", 489], ["Busan", "Qingdao", 502], ["Busan", "Dalian", 576], ["Busan", "Tianjin", 725], ["Busan", "Shenzhen", 1193], ["Busan", "Haikou", 1411], ["Busan", "Sanya", 1513], ["Jeju Seogwipo", "Keelung", 548], ["Jeju Seogwipo", "Nagasaki", 188], ["Jeju Seogwipo", "Busan", 175], ["Jeju Port North", "Keelung", 578], ["Jeju Port North", "Kagoshima", 293], ["Jeju Port North", "Sasebo", 172], ["Hong Kong", "Keelung", 485], ["Hong Kong", "Kaohsiung", 352.3], ["Hong Kong", "Penghu", 316], ["Hong Kong", "Hualien", 574], ["Hong Kong", "Taichung", 389], ["Hong Kong", "Naha", 825], ["Hong Kong", "Miyakojima", 695], ["Hong Kong", "Ishigaki", 648], ["Hong Kong", "Osaka", 1387], ["Hong Kong", "Fukuoka", 1149], ["Hong Kong", "Nagasaki", 1079], ["Hong Kong", "Kagoshima", 1080], ["Hong Kong", "Nagagusuku", 832], ["Hong Kong", "Kyoto", 1441], ["Hong Kong", "Beppu", 1262], ["Hong Kong", "Busan", 1156], ["Hong Kong", "Xiamen", 312], ["Hong Kong", "Shanghai", 872], ["Hong Kong", "Qingdao", 1147], ["Hong Kong", "Dalian", 1287], ["Hong Kong", "Tianjin", 1435], ["Hong Kong", "Shenzhen", 30], ["Hong Kong", "Haikou", 300], ["Hong Kong", "Sanya", 410], ["Hong Kong", "Nansha", 75], ["Hong Kong", "Da Nang (Tien Sa)", 525], ["Hong Kong", "Da Nang (Chan May)", 527], ["Hong Kong", "Nha Trang N**", 698], ["Hong Kong", "Nha Trang S**", 700], ["Hong Kong", "Cam Rahn", 718], ["Hong Kong", "Ho Chi Minh* (Phu My)", 931], ["Hong Kong", "Ha Long Bay", 485], ["Hong Kong", "Manila", 640], ["Hong Kong", "Boracay**", 790], ["Hong Kong", "Subic Bay", 588], ["Hong Kong", "Puerto Princesa", 925], ["Hong Kong", "Salomague**", 453], ["Hong Kong", "Coron Bay", 750], ["Hong Kong", "Currimao**", 455], ["Hong Kong", "Singapore SCC", 1455], ["Hong Kong", "Singapore MBCC", 1450], ["Xiamen", "Keelung", 242], ["Xiamen", "Kaohsiung", 191], ["Xiamen", "Penghu", 114], ["Xiamen", "Naha", 584], ["Xiamen", "Miyakojima", 429], ["Xiamen", "Ishigaki", 378], ["Xiamen", "Osaka", 1141], ["Xiamen", "Fukuoka", 902], ["Xiamen", "Nagasaki", 831], ["Xiamen", "Kagoshima", 832], ["Xiamen", "Nagagusuku", 590], ["Xiamen", "Kyoto", 1196], ["Xiamen", "Beppu", 1017], ["Xiamen", "Busan", 910], ["Xiamen", "Hong Kong", 312], ["Xiamen", "Shanghai", 624], ["Xiamen", "Qingdao", 896], ["Xiamen", "Dalian", 1038], ["Xiamen", "Tianjin", 1187], ["Xiamen", "Shenzhen", 351], ["Xiamen", "Haikou", 569], ["Xiamen", "Sanya", 666], ["Xiamen", "Da Nang (Tien Sa)", 789], ["Xiamen", "Nha Trang N**", 926], ["Xiamen", "Ho Chi Minh* (Phu My)", 1158], ["Xiamen", "Ha Long Bay", 763], ["Xiamen", "Manila", 700], ["Shanghai", "Keelung", 456], ["Shanghai", "Kaohsiung", 647], ["Shanghai", "Penghu", 609], ["Shanghai", "Naha", 471], ["Shanghai", "Miyakojima", 483], ["Shanghai", "Ishigaki", 500], ["Shanghai", "Osaka", 828], ["Shanghai", "Fukuoka", 503], ["Shanghai", "Nagasaki", 458], ["Shanghai", "Kagoshima", 512], ["Shanghai", "Nagagusuku", 525], ["Shanghai", "Kyoto", 793], ["Shanghai", "Beppu", 695], ["Shanghai", "Busan", 489], ["Shanghai", "Hong Kong", 872], ["Shanghai", "Xiamen", 624], ["Shanghai", "Qingdao", 415], ["Shanghai", "Dalian", 565], ["Shanghai", "Tianjin", 714], ["Shanghai", "Shenzhen", 910], ["Shanghai", "Haikou", 1132], ["Shanghai", "Sanya", 1238], ["Qingdao", "Keelung", 729], ["Qingdao", "Kaohsiung", 920], ["Qingdao", "Penghu", 883], ["Qingdao", "Naha", 719], ["Qingdao", "Miyakojima", 753], ["Qingdao", "Ishigaki", 772], ["Qingdao", "Osaka", 957], ["Qingdao", "Fukuoka", 546], ["Qingdao", "Nagasaki", 548], ["Qingdao", "Kagoshima", 639], ["Qingdao", "Nagagusuku", 759], ["Qingdao", "Kyoto", 826], ["Qingdao", "Beppu", 656], ["Qingdao", "Busan", 502], ["Qingdao", "Hong Kong", 1147], ["Qingdao", "Xiamen", 896], ["Qingdao", "Shanghai", 415], ["Qingdao", "Dalian", 296], ["Qingdao", "Tianjin", 444], ["Qingdao", "Shenzhen", 1181], ["Qingdao", "Haikou", 1406], ["Qingdao", "Sanya", 1512], ["Dalian", "Keelung", 873], ["Dalian", "Kaohsiung", 1061], ["Dalian", "Penghu", 1024], ["Dalian", "Naha", 843], ["Dalian", "Miyakojima", 893], ["Dalian", "Ishigaki", 916], ["Dalian", "Osaka", 1039], ["Dalian", "Fukuoka", 622], ["Dalian", "Nagasaki", 630], ["Dalian", "Kagoshima", 721], ["Dalian", "Nagagusuku", 875], ["Dalian", "Kyoto", 903], ["Dalian", "Beppu", 731], ["Dalian", "Busan", 576], ["Dalian", "Hong Kong", 1287], ["Dalian", "Xiamen", 1038], ["Dalian", "Shanghai", 565], ["Dalian", "Qingdao", 296], ["Dalian", "Tianjin", 220], ["Dalian", "Shenzhen", 1326], ["Dalian", "Haikou", 1548], ["Dalian", "Sanya", 1649], ["Tianjin", "Keelung", 1021], ["Tianjin", "Kaohsiung", 1210], ["Tianjin", "Penghu", 1173], ["Tianjin", "Naha", 991], ["Tianjin", "Miyakojima", 1041], ["Tianjin", "Ishigaki", 1064], ["Tianjin", "Osaka", 1188], ["Tianjin", "Fukuoka", 771], ["Tianjin", "Nagasaki", 779], ["Tianjin", "Kagoshima", 870], ["Tianjin", "Nagagusuku", 1023], ["Tianjin", "Kyoto", 1051], ["Tianjin", "Beppu", 880], ["Tianjin", "Busan", 725], ["Tianjin", "Hong Kong", 1435], ["Tianjin", "Xiamen", 1187], ["Tianjin", "Shanghai", 714], ["Tianjin", "Qingdao", 444], ["Tianjin", "Dalian", 220], ["Tianjin", "Shenzhen", 1474], ["Tianjin", "Haikou", 1696], ["Tianjin", "Sanya", 1798], ["Shenzhen", "Keelung", 524], ["Shenzhen", "Kaohsiung", 386], ["Shenzhen", "Penghu", 364], ["Shenzhen", "Naha", 843], ["Shenzhen", "Miyakojima", 711], ["Shenzhen", "Ishigaki", 660], ["Shenzhen", "Osaka", 1426], ["Shenzhen", "Fukuoka", 1187], ["Shenzhen", "Nagasaki", 1117], ["Shenzhen", "Kagoshima", 1118], ["Shenzhen", "Nagagusuku", 874], ["Shenzhen", "Kyoto", 1479], ["Shenzhen", "Beppu", 1300], ["Shenzhen", "Busan", 1193], ["Shenzhen", "Hong Kong", 30], ["Shenzhen", "Xiamen", 351], ["Shenzhen", "Shanghai", 910], ["Shenzhen", "Qingdao", 1181], ["Shenzhen", "Dalian", 1326], ["Shenzhen", "Tianjin", 1474], ["Shenzhen", "Haikou", 279], ["Shenzhen", "Sanya", 395], ["Shenzhen", "Da Nang (Tien Sa)", 520], ["Shenzhen", "Nha Trang N**", 689], ["Shenzhen", "Ho Chi Minh* (Phu My)", 932], ["Shenzhen", "Ha Long Bay", 480], ["Shenzhen", "Manila", 663], ["Haikou", "Keelung", 742], ["Haikou", "Kaohsiung", 605], ["Haikou", "Penghu", 615], ["Haikou", "Naha", 1085], ["Haikou", "Miyakojima", 932], ["Haikou", "Ishigaki", 876], ["Haikou", "Osaka", 1643], ["Haikou", "Fukuoka", 1403], ["Haikou", "Nagasaki", 1334], ["Haikou", "Kagoshima", 1335], ["Haikou", "Nagagusuku", 1106], ["Haikou", "Kyoto", 1696], ["Haikou", "Beppu", 1517], ["Haikou", "Busan", 1411], ["Haikou", "Hong Kong", 300], ["Haikou", "Xiamen", 569], ["Haikou", "Shanghai", 1132], ["Haikou", "Qingdao", 1406], ["Haikou", "Dalian", 1548], ["Haikou", "Tianjin", 1696], ["Haikou", "Shenzhen", 279], ["Haikou", "Sanya", 254], ["Haikou", "Da Nang (Tien Sa)", 375], ["Haikou", "Nha Trang N**", 558], ["Haikou", "Ho Chi Minh* (Phu My)", 805], ["Haikou", "Ha Long Bay", 210], ["Haikou", "Manila", 735], ["Hainan Straits W", "Hainan Straits E", 70], ["Hainan Straits W", "Ha Long Bay", 171], ["Hainan Straits E", "Kaohsiung", 550], ["Hainan Straits E", "Hainan Straits W", 70], ["Sanya", "Keelung", 844], ["Sanya", "Kaohsiung", 685], ["Sanya", "Penghu", 710], ["Sanya", "Naha", 1162], ["Sanya", "Miyakojima", 1010], ["Sanya", "Ishigaki", 954], ["Sanya", "Osaka", 1745], ["Sanya", "Fukuoka", 1506], ["Sanya", "Nagasaki", 1437], ["Sanya", "Kagoshima", 1437], ["Sanya", "Nagagusuku", 1183], ["Sanya", "Kyoto", 1799], ["Sanya", "Beppu", 1621], ["Sanya", "Busan", 1513], ["Sanya", "Hong Kong", 410], ["Sanya", "Xiamen", 666], ["Sanya", "Shanghai", 1238], ["Sanya", "Qingdao", 1512], ["Sanya", "Dalian", 1649], ["Sanya", "Tianjin", 1798], ["Sanya", "Shenzhen", 395], ["Sanya", "Haikou", 254], ["Sanya", "Da Nang (Tien Sa)", 150], ["Sanya", "Da Nang (Chan May)", 145], ["Sanya", "Nha Trang N**", 375], ["Sanya", "Ho Chi Minh* (Phu My)", 628], ["Sanya", "Ha Long Bay", 260], ["Sanya", "Manila", 715], ["Sanya", "Boracay**", 870], ["Sanya", "Subic Bay", 730], ["Sanya", "Singapore SCC", 1165], ["Sanya", "Singapore MBCC", 1160], ["Nansha", "Naha", 873], ["Nansha", "Miyakojima", 740], ["Nansha", "Hong Kong", 75], ["Nansha", "Da Nang (Tien Sa)", 523], ["Nansha", "Nha Trang N**", 686], ["Nansha", "Ha Long Bay", 468], ["Nansha", "Manila", 673], ["Nansha", "Boracay**", 825], ["Nansha", "Subic Bay", 621], ["Con Son**", "Ho Chi Minh* (Phu My)", 130], ["Da Nang (Tien Sa)", "Keelung", 986], ["Da Nang (Tien Sa)", "Kaohsiung", 792], ["Da Nang (Tien Sa)", "Penghu", 810], ["Da Nang (Tien Sa)", "Naha", 1262], ["Da Nang (Tien Sa)", "Miyakojima", 1110], ["Da Nang (Tien Sa)", "Ishigaki", 1062], ["Da Nang (Tien Sa)", "Nagagusuku", 1287], ["Da Nang (Tien Sa)", "Hong Kong", 526], ["Da Nang (Tien Sa)", "Xiamen", 789], ["Da Nang (Tien Sa)", "Shenzhen", 520], ["Da Nang (Tien Sa)", "Haikou", 375], ["Da Nang (Tien Sa)", "Sanya", 148], ["Da Nang (Tien Sa)", "Nansha", 523], ["Da Nang (Tien Sa)", "Da Nang (Chan May)", 35], ["Da Nang (Tien Sa)", "Nha Trang N**", 298], ["Da Nang (Tien Sa)", "Nha Trang S**", 306], ["Da Nang (Tien Sa)", "Cam Rahn", 329], ["Da Nang (Tien Sa)", "Ho Chi Minh* (Phu My)", 560], ["Da Nang (Tien Sa)", "Ha Long Bay", 299], ["Da Nang (Tien Sa)", "Manila", 758], ["Da Nang (Tien Sa)", "Boracay**", 860], ["Da Nang (Tien Sa)", "Subic Bay", 720], ["Da Nang (Tien Sa)", "Singapore SCC", 1155], ["Da Nang (Tien Sa)", "Singapore MBCC", 1150], ["Da Nang (Chan May)", "Keelung", 980], ["Da Nang (Chan May)", "Kaohsiung", 795], ["Da Nang (Chan May)", "Hong Kong", 527], ["Da Nang (Chan May)", "Sanya", 146], ["Da Nang (Chan May)", "Da Nang (Tien Sa)", 35], ["Da Nang (Chan May)", "Nha Trang N**", 312], ["Da Nang (Chan May)", "Nha Trang S**", 322], ["Da Nang (Chan May)", "Cam Rahn", 344], ["Da Nang (Chan May)", "Ho Chi Minh* (Phu My)", 590], ["Da Nang (Chan May)", "Ha Long Bay", 284], ["Da Nang (Chan May)", "Singapore SCC", 1090], ["Da Nang (Chan May)", "Singapore MBCC", 1085], ["Nha Trang N**", "Keelung", 1096], ["Nha Trang N**", "Kaohsiung", 896], ["Nha Trang N**", "Penghu", 917], ["Nha Trang N**", "Naha", 1345], ["Nha Trang N**", "Miyakojima", 1194], ["Nha Trang N**", "Ishigaki", 1138], ["Nha Trang N**", "Nagagusuku", 1366], ["Nha Trang N**", "Hong Kong", 698], ["Nha Trang N**", "Xiamen", 926], ["Nha Trang N**", "Shenzhen", 689], ["Nha Trang N**", "Haikou", 558], ["Nha Trang N**", "Sanya", 375], ["Nha Trang N**", "Nansha", 686], ["Nha Trang N**", "Da Nang (Tien Sa)", 298], ["Nha Trang N**", "Da Nang (Chan May)", 312], ["Nha Trang N**", "Ho Chi Minh* (Phu My)", 271], ["Nha Trang N**", "Ha Long Bay", 580], ["Nha Trang N**", "Manila", 704], ["Nha Trang N**", "Boracay**", 765], ["Nha Trang N**", "Subic Bay", 665], ["Nha Trang S**", "Keelung", 1100], ["Nha Trang S**", "Hong Kong", 700], ["Nha Trang S**", "Da Nang (Tien Sa)", 306], ["Nha Trang S**", "Da Nang (Chan May)", 322], ["Nha Trang S**", "Ho Chi Minh* (Phu My)", 235], ["Nha Trang S**", "Ho Chi Minh* (HCMC)", 250], ["Nha Trang S**", "Ha Long Bay", 575], ["Nha Trang S**", "Singapore SCC", 791], ["Nha Trang S**", "Singapore MBCC", 786], ["Cam Rahn", "Hong Kong", 719], ["Cam Rahn", "Da Nang (Tien Sa)", 332], ["Cam Rahn", "Da Nang (Chan May)", 344], ["Cam Rahn", "Ho Chi Minh (Dong Nai)", 242], ["Cam Rahn", "Singapore SCC", 760], ["Cam Rahn", "Singapore MBCC", 752], ["Ho Chi Minh* (Phu My)", "Keelung", 1320], ["Ho Chi Minh* (Phu My)", "Kaohsiung", 1118], ["Ho Chi Minh* (Phu My)", "Penghu", 1146], ["Ho Chi Minh* (Phu My)", "Naha", 1567], ["Ho Chi Minh* (Phu My)", "Miyakojima", 1419], ["Ho Chi Minh* (Phu My)", "Ishigaki", 1365], ["Ho Chi Minh* (Phu My)", "Nagagusuku", 1589], ["Ho Chi Minh* (Phu My)", "Hong Kong", 938], ["Ho Chi Minh* (Phu My)", "Xiamen", 1158], ["Ho Chi Minh* (Phu My)", "Shenzhen", 932], ["Ho Chi Minh* (Phu My)", "Haikou", 805], ["Ho Chi Minh* (Phu My)", "Sanya", 628], ["Ho Chi Minh* (Phu My)", "Con Son**", 130], ["Ho Chi Minh* (Phu My)", "Da Nang (Tien Sa)", 560], ["Ho Chi Minh* (Phu My)", "Da Nang (Chan May)", 590], ["Ho Chi Minh* (Phu My)", "Nha Trang N**", 255], ["Ho Chi Minh* (Phu My)", "Nha Trang S**", 235], ["Ho Chi Minh* (Phu My)", "Ha Long Bay", 824], ["Ho Chi Minh* (Phu My)", "Manila", 892], ["Ho Chi Minh* (Phu My)", "Boracay**", 1005], ["Ho Chi Minh* (Phu My)", "Subic Bay", 922], ["Ho Chi Minh* (Phu My)", "Sihanoukville", 455], ["Ho Chi Minh* (Phu My)", "Redang**", 415], ["Ho Chi Minh* (Phu My)", "Singapore SCC", 635], ["Ho Chi Minh* (Phu My)", "Singapore MBCC", 630], ["Ho Chi Minh* (HCMC)", "Nha Trang S**", 250], ["Ho Chi Minh (Dong Nai)", "Singapore SCC", 644], ["Ha Long Bay", "Keelung", 936], ["Ha Long Bay", "Kaohsiung", 780], ["Ha Long Bay", "Penghu", 807], ["Ha Long Bay", "Naha", 1277], ["Ha Long Bay", "Miyakojima", 1125], ["Ha Long Bay", "Ishigaki", 1070], ["Ha Long Bay", "Nagagusuku", 1299], ["Ha Long Bay", "Hong Kong", 483], ["Ha Long Bay", "Xiamen", 750], ["Ha Long Bay", "Shenzhen", 480], ["Ha Long Bay", "Haikou", 210], ["Ha Long Bay", "Hainan Straits W", 171], ["Ha Long Bay", "Sanya", 250], ["Ha Long Bay", "Nansha", 468], ["Ha Long Bay", "Da Nang (Tien Sa)", 301], ["Ha Long Bay", "Da Nang (Chan May)", 285], ["Ha Long Bay", "Nha Trang N**", 580], ["Ha Long Bay", "Nha Trang S**", 575], ["Ha Long Bay", "Cam Rahn", 642], ["Ha Long Bay", "Ho Chi Minh* (Phu My)", 824], ["Ha Long Bay", "Manila", 943], ["Ha Long Bay", "Boracay**", 1083], ["Ha Long Bay", "Subic Bay", 945], ["Ha Long Bay", "Singapore SCC", 1381], ["Ha Long Bay", "Singapore MBCC", 1350], ["Phu Quoc", "Laem Chabang", 290], ["Manila", "Keelung", 767], ["Manila", "Kaohsiung", 562], ["Manila", "Penghu", 617], ["Manila", "Naha", 935], ["Manila", "Miyakojima", 790], ["Manila", "Ishigaki", 745], ["Manila", "Nagagusuku", 954], ["Manila", "Hong Kong", 640], ["Manila", "Xiamen", 700], ["Manila", "Shenzhen", 663], ["Manila", "Haikou", 735], ["Manila", "Sanya", 715], ["Manila", "Nansha", 673], ["Manila", "Da Nang (Tien Sa)", 758], ["Manila", "Nha Trang N**", 704], ["Manila", "Ho Chi Minh* (Phu My)", 892], ["Manila", "Ha Long Bay", 943], ["Manila", "Boracay**", 221], ["Manila", "Subic Bay", 84], ["Manila", "Puerto Princesa", 399], ["Manila", "Salomague**", 289], ["Manila", "Coron Bay", 191], ["Manila", "Currimao**", 302], ["Manila", "Singapore SCC", 1335], ["Manila", "Singapore MBCC", 1330], ["Boracay**", "Keelung", 945], ["Boracay**", "Kaohsiung", 718], ["Boracay**", "Penghu", 795], ["Boracay**", "Hong Kong", 788], ["Boracay**", "Sanya", 870], ["Boracay**", "Nansha", 825], ["Boracay**", "Da Nang (Tien Sa)", 860], ["Boracay**", "Nha Trang N**", 765], ["Boracay**", "Ho Chi Minh* (Phu My)", 1004], ["Boracay**", "Ha Long Bay", 1083], ["Boracay**", "Manila", 221], ["Boracay**", "Subic Bay", 230], ["Boracay**", "Puerto Princesa", 255], ["Boracay**", "Salomague**", 435], ["Boracay**", "Coron Bay", 119], ["Boracay**", "Currimao**", 466], ["Boracay**", "Singapore SCC", 1300], ["Boracay**", "Singapore MBCC", 1295], ["Subic Bay", "Keelung", 740], ["Subic Bay", "Kaohsiung", 520], ["Subic Bay", "Penghu", 590], ["Subic Bay", "Hong Kong", 588], ["Subic Bay", "Sanya", 730], ["Subic Bay", "Nansha", 621], ["Subic Bay", "Da Nang (Tien Sa)", 720], ["Subic Bay", "Nha Trang N**", 665], ["Subic Bay", "Ho Chi Minh* (Phu My)", 922], ["Subic Bay", "Ha Long Bay", 945], ["Subic Bay", "Manila", 84], ["Subic Bay", "Boracay**", 230], ["Subic Bay", "Puerto Princesa", 389], ["Subic Bay", "Salomague**", 226], ["Subic Bay", "Coron Bay", 197], ["Subic Bay", "Currimao**", 240], ["Subic Bay", "Singapore SCC", 1315], ["Subic Bay", "Singapore MBCC", 1310], ["Puerto Princesa", "Keelung", 1078], ["Puerto Princesa", "Kaohsiung", 863], ["Puerto Princesa", "Hong Kong", 925], ["Puerto Princesa", "Manila", 399], ["Puerto Princesa", "Boracay**", 255], ["Puerto Princesa", "Subic Bay", 389], ["Puerto Princesa", "Salomague**", 577], ["Puerto Princesa", "Coron Bay", 213], ["Puerto Princesa", "Currimao**", 590], ["Puerto Princesa", "Singapore SCC", 1082], ["Puerto Princesa", "Singapore MBCC", 1077], ["Salomague**", "Keelung", 512], ["Salomague**", "Kaohsiung", 300], ["Salomague**", "Hong Kong", 453], ["Salomague**", "Manila", 289], ["Salomague**", "Boracay**", 435], ["Salomague**", "Subic Bay", 226], ["Salomague**", "Puerto Princesa", 577], ["Salomague**", "Coron Bay", 395], ["Salomague**", "Currimao**", 22], ["Salomague**", "Singapore SCC", 1415], ["Salomague**", "Singapore MBCC", 1410], ["Coron Bay", "Keelung", 915], ["Coron Bay", "Kaohsiung", 680], ["Coron Bay", "Hong Kong", 765], ["Coron Bay", "Manila", 191], ["Coron Bay", "Boracay**", 110], ["Coron Bay", "Subic Bay", 197], ["Coron Bay", "Puerto Princesa", 213], ["Coron Bay", "Salomague**", 395], ["Coron Bay", "Currimao**", 406], ["Coron Bay", "Singapore SCC", 1255], ["Coron Bay", "Singapore MBCC", 1250], ["Currimao**", "Keelung", 498], ["Currimao**", "Kaohsiung", 288], ["Currimao**", "Hong Kong", 455], ["Currimao**", "Manila", 302], ["Currimao**", "Boracay**", 466], ["Currimao**", "Subic Bay", 240], ["Currimao**", "Puerto Princesa", 590], ["Currimao**", "Salomague**", 22], ["Currimao**", "Coron Bay", 406], ["Currimao**", "Singapore SCC", 1440], ["Currimao**", "Singapore MBCC", 1435], ["Sihanoukville", "Singapore MBCC", 605], ["Bali Benoa", "Jakarta", 662], ["Bali Benoa", "Lombok", 55], ["Bali Benoa", "Singapore SCC", 1009], ["Bali Benoa", "Singapore MBCC", 1006], ["Bali Benoa", "Ko Samui**", 240], ["Bali North**", "Lombok", 110], ["Bali North**", "Singapore SCC", 913], ["Bali North**", "Singapore MBCC", 910], ["Jakarta", "Sihanoukville", 1179], ["Jakarta", "Bali Benoa", 662], ["Jakarta", "Medan", 703], ["Jakarta", "Pulau Bangka**", 445], ["Jakarta", "Belitung**", 225], ["Jakarta", "Port Klang CT (South)", 765], ["Jakarta", "Port Klang WP", 762], ["Jakarta", "Singapore MBCC", 570], ["Lombok", "Singapore SCC", 991], ["Lombok", "Singapore MBCC", 988], ["Surabaya", "Bali North**", 204], ["Surabaya", "Jakarta", 406], ["Surabaya", "Singapore MBCC", 774], ["Medan", "Port Klang CT (South)", 141], ["Medan", "Penang", 160], ["Medan", "Singapore SCC", 318], ["Pulau Bangka**", "Jakarta", 445], ["Pulau Bangka**", "Singapore MBCC", 293], ["Belitung**", "Jakarta", 225], ["Belitung**", "Singapore MBCC", 360], ["Bintan**", "Singapore SCC", 111], ["Melaka**", "Jakarta", 703], ["Melaka**", "Medan", 211], ["Melaka**", "Port Dickson**", 50], ["Melaka**", "Port Klang CT (South)", 93], ["Melaka**", "Port Klang WP", 88], ["Melaka**", "Langkawi", 315], ["Melaka**", "Penang", 282], ["Melaka**", "Singapore SCC", 143], ["Melaka**", "Singapore MBCC", 143], ["Melaka**", "Phuket DSP", 422], ["Melaka**", "Phuket Patong**", 438], ["Port Klang CT (South)", "Jakarta", 765], ["Port Klang CT (South)", "Medan", 154], ["Port Klang CT (South)", "Bintan**", 242], ["Port Klang CT (South)", "Melaka**", 94], ["Port Klang CT (South)", "Port Dickson**", 66], ["Port Klang CT (South)", "Port Klang WP", 3], ["Port Klang CT (South)", "Langkawi", 234], ["Port Klang CT (South)", "Penang", 202], ["Port Klang CT (South)", "Singapore SCC", 210], ["Port Klang CT (South)", "Singapore MBCC", 210], ["Port Klang CT (South)", "Phuket DSP", 341], ["Port Klang CT (South)", "Phuket Patong**", 356], ["Port Klang CT (South)", "Krabi**", 357], ["Port Klang WP", "Jakarta", 762], ["Port Klang WP", "Medan", 157], ["Port Klang WP", "Melaka**", 91], ["Port Klang WP", "Port Dickson**", 63], ["Port Klang WP", "Port Klang CT (South)", 3], ["Port Klang WP", "Langkawi", 237], ["Port Klang WP", "Penang", 205], ["Port Klang WP", "Singapore SCC", 206], ["Port Klang WP", "Singapore MBCC", 212], ["Port Klang WP", "Phuket DSP", 344], ["Port Klang WP", "Phuket Patong**", 359], ["Port Klang WP", "Krabi**", 360], ["Langkawi", "Melaka**", 319], ["Langkawi", "Port Dickson**", 291], ["Langkawi", "Port Klang CT (South)", 234], ["Langkawi", "Port Klang WP", 237], ["Langkawi", "Penang", 74], ["Langkawi", "Singapore MBCC", 445], ["Langkawi", "Phuket DSP", 130], ["Langkawi", "Phuket Patong**", 149], ["Penang", "Medan", 160], ["Penang", "Melaka**", 281], ["Penang", "Port Dickson**", 251], ["Penang", "Port Klang CT (South)", 200], ["Penang", "Port Klang WP", 203], ["Penang", "Langkawi", 74], ["Penang", "Singapore SCC", 403], ["Penang", "Singapore MBCC", 416], ["Penang", "Phuket DSP", 189], ["Penang", "Phuket Patong**", 210], ["Penang", "Krabi**", 197], ["Redang**", "Tioman**", 200], ["Redang**", "Singapore MBCC", 325], ["Redang**", "Ko Samui**", 320], ["Tioman**", "Redang**", 200], ["Tioman**", "Singapore SCC", 142], ["Tioman**", "Singapore MBCC", 135], ["Pangkor**", "Singapore SCC", 309], ["Singapore SCC", "Keelung", 1847], ["Singapore SCC", "Sanya", 1165], ["Singapore SCC", "Da Nang (Tien Sa)", 1155], ["Singapore SCC", "Da Nang (Chan May)", 1104], ["Singapore SCC", "Nha Trang N**", 790], ["Singapore SCC", "Cam Rahn", 760], ["Singapore SCC", "Ho Chi Minh* (Phu My)", 635], ["Singapore SCC", "Ho Chi Minh (Dong Nai)", 636], ["Singapore SCC", "Ha Long Bay", 1355], ["Singapore SCC", "Manila", 1335], ["Singapore SCC", "Boracay**", 1300], ["Singapore SCC", "Subic Bay", 1315], ["Singapore SCC", "Puerto Princesa", 1082], ["Singapore SCC", "Salomague**", 1415], ["Singapore SCC", "Coron Bay", 1255], ["Singapore SCC", "Currimao**", 1440], ["Singapore SCC", "Bali Benoa", 1009], ["Singapore SCC", "Bali North**", 901], ["Singapore SCC", "Lombok", 1008], ["Singapore SCC", "Medan", 332], ["Singapore SCC", "Melaka**", 144], ["Singapore SCC", "Port Klang CT (South)", 210], ["Singapore SCC", "Penang", 411], ["Singapore SCC", "Tioman**", 142], ["Singapore SCC", "Pangkor**", 300], ["Singapore SCC", "Singapore MBCC", 5], ["Singapore SCC", "Laem Chabang", 795], ["Singapore SCC", "Phuket DSP", 555], ["Singapore SCC", "Phuket Patong**", 572], ["Singapore SCC", "Ko Samui**", 650], ["Singapore SCC", "Krabi**", 575], ["Singapore MBCC", "Keelung", 1842], ["Singapore MBCC", "Sanya", 1160], ["Singapore MBCC", "Da Nang (Tien Sa)", 1150], ["Singapore MBCC", "Da Nang (Chan May)", 1096], ["Singapore MBCC", "Nha Trang N**", 785], ["Singapore MBCC", "Ho Chi Minh* (Phu My)", 630], ["Singapore MBCC", "Ha Long Bay", 1350], ["Singapore MBCC", "Manila", 1330], ["Singapore MBCC", "Boracay**", 1295], ["Singapore MBCC", "Subic Bay", 1310], ["Singapore MBCC", "Puerto Princesa", 1077], ["Singapore MBCC", "Salomague**", 1410], ["Singapore MBCC", "Coron Bay", 1250], ["Singapore MBCC", "Currimao**", 1435], ["Singapore MBCC", "Sihanoukville", 605], ["Singapore MBCC", "Bali Benoa", 1006], ["Singapore MBCC", "Bali North**", 906], ["Singapore MBCC", "Jakarta", 570], ["Singapore MBCC", "Lombok", 1005], ["Singapore MBCC", "Surabaya", 774], ["Singapore MBCC", "Medan", 324], ["Singapore MBCC", "Pulau Bangka**", 293], ["Singapore MBCC", "Belitung**", 360], ["Singapore MBCC", "Melaka**", 137], ["Singapore MBCC", "Port Dickson**", 171], ["Singapore MBCC", "Port Klang CT (South)", 215], ["Singapore MBCC", "Port Klang WP", 207], ["Singapore MBCC", "Langkawi", 437], ["Singapore MBCC", "Penang", 412], ["Singapore MBCC", "Redang**", 325], ["Singapore MBCC", "Tioman**", 135], ["Singapore MBCC", "Pangkor**", 307], ["Singapore MBCC", "Singapore SCC", 5], ["Singapore MBCC", "Laem Chabang", 790], ["Singapore MBCC", "Phuket DSP", 560], ["Singapore MBCC", "Phuket Patong**", 571], ["Singapore MBCC", "Ko Samui**", 645], ["Singapore MBCC", "Krabi**", 558], ["Laem Chabang", "Phu Qoc", 290], ["Laem Chabang", "Singapore SCC", 795], ["Laem Chabang", "Singapore MBCC", 790], ["Laem Chabang", "Ko Samui**", 230], ["Phuket DSP", "Melaka**", 428], ["Phuket DSP", "Port Dickson**", 399], ["Phuket DSP", "Port Klang CT (South)", 342], ["Phuket DSP", "Port Klang WP", 345], ["Phuket DSP", "Langkawi", 131], ["Phuket DSP", "Penang", 191], ["Phuket DSP", "Singapore SCC", 554], ["Phuket DSP", "Singapore MBCC", 552], ["Phuket DSP", "Phuket Patong**", 30], ["Phuket DSP", "Krabi**", 28], ["Phuket Patong**", "Melaka**", 415], ["Phuket Patong**", "Port Dickson**", 444], ["Phuket Patong**", "Port Klang CT (South)", 359], ["Phuket Patong**", "Port Klang WP", 361], ["Phuket Patong**", "Langkawi", 149], ["Phuket Patong**", "Penang", 207], ["Phuket Patong**", "Singapore SCC", 560], ["Phuket Patong**", "Singapore MBCC", 568], ["Phuket Patong**", "Phuket DSP", 30], ["Ko Samui**", "Redang**", 320], ["Ko Samui**", "Singapore SCC", 670], ["Ko Samui**", "Singapore MBCC", 665], ["Ko Samui**", "Laem Chabang", 230], ["Krabi**", "Penang", 207], ["Krabi**", "Singapore SCC", 575], ["Krabi**", "Singapore MBCC", 558]];

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const SPEED_OPTIONS = Array.from({ length: 23 }, (_, i) => i + 8);
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`);

function makeEmptyRows() {
  return DAYS.map((day) => ({ day, port: "", departure: "", speedInput: "", targetArrival: "" }));
}

function parseTimeToHours(value) {
  if (!value) return null;
  const [h, m] = String(value).split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h + m / 60;
}

function formatHoursAsTime(hours) {
  if (!Number.isFinite(hours)) return "";
  const wrapped = ((hours % 24) + 24) % 24;
  const h = Math.floor(wrapped);
  const minutesRaw = Math.round((wrapped - h) * 60);
  const finalH = (h + Math.floor(minutesRaw / 60)) % 24;
  const finalM = minutesRaw % 60;
  return `${String(finalH).padStart(2, "0")}:${String(finalM).padStart(2, "0")}`;
}

function speedClass(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  if (n <= 17.9) return "speed-green";
  if (n <= 20.9) return "speed-amber";
  return "speed-red";
}

function makeDistanceMap() {
  const map = new Map();
  DISTANCE_PAIRS.forEach(([from, to, nm]) => {
    const key = `${from}|||${to}`;
    if (!map.has(key)) map.set(key, Number(nm));
  });
  return map;
}

function getDistanceFromMap(map, from, to) {
  if (!from || !to || from === "Highsea" || to === "Highsea") return null;
  return map.get(`${from}|||${to}`) ?? null;
}

function calculateRows(rows, distanceMap) {
  const result = rows.map((row) => ({...row, effectiveSpeed: "", distanceNm: "", requiredSeaDays: "", calculatedArrival: "", portStay: "", targetSpeed: "", warning: ""}));

  let lastSpeed = "";
  for (let i = 0; i < result.length; i++) {
    if (result[i].speedInput !== "") lastSpeed = result[i].speedInput;
    result[i].effectiveSpeed = lastSpeed;
  }

  for (let i = 0; i < result.length; i++) {
    const row = result[i];
    const next = result[i + 1];
    if (!row.port) continue;

    if (row.port === "Highsea") {
      const speed = Number(row.effectiveSpeed);
      if (Number.isFinite(speed) && speed > 0) {
        row.distanceNm = Math.round(speed * 24 * 10) / 10;
        row.requiredSeaDays = 1;
      }
      continue;
    }

    if (next?.port && next.port !== "Highsea") {
      const nm = getDistanceFromMap(distanceMap, row.port, next.port);
      if (nm !== null) {
        row.distanceNm = nm;
        const speed = Number(row.effectiveSpeed);
        if (Number.isFinite(speed) && speed > 0) row.requiredSeaDays = Math.round((nm / (speed * 24)) * 10) / 10;
      } else {
        row.warning = "No distance data for next port";
      }
    }
  }

  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    if (!current.port || current.port === "Highsea") continue;

    for (let j = i - 1; j >= 0; j--) {
      const previous = result[j];
      if (!previous.port || previous.port === "Highsea" || !previous.departure) continue;
      const nm = getDistanceFromMap(distanceMap, previous.port, current.port);
      const speed = Number(previous.effectiveSpeed);
      const depHours = parseTimeToHours(previous.departure);
      if (nm !== null && Number.isFinite(speed) && speed > 0 && depHours !== null) {
        current.calculatedArrival = formatHoursAsTime(depHours + nm / speed);
        break;
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    const row = result[i];
    if (row.port === "Highsea" || !row.calculatedArrival || !row.departure) continue;
    const arr = parseTimeToHours(row.calculatedArrival);
    const dep = parseTimeToHours(row.departure);
    if (arr === null || dep === null) continue;
    let stay = dep - arr;
    if (stay < 0) stay += 24;
    row.portStay = Math.round(stay * 10) / 10;
  }

  // Target Arrival is entered at the destination row.
  // Target Speed appears on the nearest previous real departure row.
  for (let targetIndex = 1; targetIndex < result.length; targetIndex++) {
    const targetRow = result[targetIndex];
    if (!targetRow.targetArrival || !targetRow.port || targetRow.port === "Highsea") continue;

    for (let depIndex = targetIndex - 1; depIndex >= 0; depIndex--) {
      const depRow = result[depIndex];
      if (!depRow.port || depRow.port === "Highsea" || !depRow.departure) continue;

      const nm = getDistanceFromMap(distanceMap, depRow.port, targetRow.port);
      const depHours = parseTimeToHours(depRow.departure);
      const targetHours = parseTimeToHours(targetRow.targetArrival);

      if (nm === null || depHours === null || targetHours === null) {
        depRow.warning = depRow.warning || "No distance data for target port";
        break;
      }

      const totalHours = (targetIndex - depIndex) * 24 + targetHours - depHours;
      if (totalHours > 0) {
        depRow.targetSpeed = Math.round((nm / totalHours) * 10) / 10;
      }
      break;
    }
  }

  return result;
}

function runPlannerTests() {
  const distanceMap = makeDistanceMap();
  const sample = makeEmptyRows();
  sample[0] = { ...sample[0], port: "Singapore SCC", departure: "20:00", speedInput: "12" };
  sample[1] = { ...sample[1], port: "Highsea" };
  sample[2] = { ...sample[2], port: "Da Nang (Tien Sa)", targetArrival: "11:30" };
  const calculated = calculateRows(sample, distanceMap);

  return [
    { name: "Full port list loaded", pass: PORTS.length === 96, expected: "96 ports", actual: `${PORTS.length} ports` },
    { name: "Full distance database loaded", pass: DISTANCE_PAIRS.length === 1174, expected: "1174 pairs", actual: `${DISTANCE_PAIRS.length} pairs` },
    { name: "Highsea distance = speed × 24", pass: calculated[1].distanceNm === 288, expected: "288 NM", actual: `${calculated[1].distanceNm || "blank"} NM` },
    { name: "Singapore SCC → Da Nang distance data exists", pass: getDistanceFromMap(distanceMap, "Singapore SCC", "Da Nang (Tien Sa)") === 1155, expected: "1155 NM", actual: `${getDistanceFromMap(distanceMap, "Singapore SCC", "Da Nang (Tien Sa)")} NM` },
    { name: "Arrival captures at Da Nang after Highsea", pass: calculated[2].calculatedArrival === "20:15", expected: "20:15", actual: calculated[2].calculatedArrival || "blank" },
    { name: "Target speed appears on previous departure row", pass: calculated[0].targetSpeed === 29.2, expected: "29.2 kt", actual: `${calculated[0].targetSpeed || "blank"} kt` },
    { name: "Target speed stays blank on destination row", pass: calculated[2].targetSpeed === "", expected: "blank", actual: calculated[2].targetSpeed === "" ? "blank" : `${calculated[2].targetSpeed} kt` }
  ];
}

export default function App() {
  const [rows, setRows] = useState(makeEmptyRows());
  const distanceMap = useMemo(() => makeDistanceMap(), []);
  const calculated = useMemo(() => calculateRows(rows, distanceMap), [rows, distanceMap]);
  const tests = useMemo(() => runPlannerTests(), []);

  const updateRow = (index, key, value) => setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  const resetPlanner = () => setRows(makeEmptyRows());

  const sampleVoyage = () => {
    const sample = makeEmptyRows();
    sample[0] = { ...sample[0], port: "Singapore SCC", departure: "20:00", speedInput: "12" };
    sample[1] = { ...sample[1], port: "Highsea" };
    sample[2] = { ...sample[2], port: "Da Nang (Tien Sa)", targetArrival: "11:30" };
    setRows(sample);
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <h1>🚢 Prototype Voyage Planner</h1>
          <p>Finalized data version: 96 ports and 1,174 valid NM distance pairs from the agreed Excel workbook.</p>
        </div>
        <div className="actions">
          <button onClick={sampleVoyage}>Load sample</button>
          <button onClick={resetPlanner} className="secondary">Reset</button>
        </div>
      </header>

      <section className="cards">
        <div className="card"><small>Highsea rule</small><strong>Distance = Speed × 24</strong><span>Highsea is a virtual 24-hour sailing day.</span></div>
        <div className="card"><small>Arrival logic</small><strong>Previous Departure + Distance ÷ Speed</strong><span>Uses nearest previous real departure port.</span></div>
        <div className="card"><small>Target speed</small><strong>Shows on departure row</strong><span>Enter Target Arrival at destination row.</span></div>
      </section>

      <main className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Day</th><th>Port</th><th>Arrival</th><th>Departure</th><th>Port Stay</th><th>Speed Input</th><th>Distance NM</th><th>Target Arrival</th><th>Target Speed</th><th>Required Sea Days</th>
            </tr>
          </thead>
          <tbody>
            {calculated.map((row, index) => (
              <tr key={`${row.day}-${index}`}>
                <td className="day">{row.day}</td>
                <td>
                  <select value={row.port} onChange={(event) => updateRow(index, "port", event.target.value)}>
                    <option value="">Select port</option>
                    {PORTS.map((port) => <option key={port} value={port}>{port}</option>)}
                  </select>
                </td>
                <td className="mono">{row.calculatedArrival}</td>
                <td>
                  <select value={row.departure} disabled={row.port === "Highsea"} onChange={(event) => updateRow(index, "departure", event.target.value)}>
                    <option value="" />
                    {TIME_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}
                  </select>
                </td>
                <td className="mono">{row.portStay}</td>
                <td>
                  <select value={row.speedInput} onChange={(event) => updateRow(index, "speedInput", event.target.value)} className={speedClass(row.speedInput)}>
                    <option value="" />
                    {SPEED_OPTIONS.map((speed) => <option key={speed} value={speed}>{speed}</option>)}
                  </select>
                </td>
                <td className="mono">
                  {row.distanceNm}
                  {row.warning && <div className="warning">{row.warning}</div>}
                </td>
                <td>
                  <select value={row.targetArrival} disabled={row.port === "Highsea"} onChange={(event) => updateRow(index, "targetArrival", event.target.value)}>
                    <option value="" />
                    {TIME_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}
                  </select>
                </td>
                <td className={`mono ${speedClass(row.targetSpeed)}`}>{row.targetSpeed}</td>
                <td className="mono">
                  {row.requiredSeaDays !== "" ? row.requiredSeaDays : ""}
                  {Number(row.requiredSeaDays) > 1 && <span className="badge">⚠ add Highsea</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <section className="bottom">
        <div className="note">
          <strong>Planner guidance</strong>
          <p>If Required Sea Days is greater than 1.0, add Highsea rows before the destination port. Highsea itself calculates NM as speed × 24.</p>
        </div>
        <div className="tests">
          <strong>Built-in calculation checks</strong>
          {tests.map((test) => (
            <div key={test.name} className="test-row">
              <div>
                <b>{test.name}</b>
                <small>Expected: {test.expected} | Actual: {test.actual}</small>
              </div>
              <span className={test.pass ? "pass" : "fail"}>{test.pass ? "PASS" : "CHECK"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
